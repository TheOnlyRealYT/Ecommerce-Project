from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from rest_framework import status
from .models import Category, Product, Cart, CartItem, Order, OrderItem
from .serializers import CategorySerializer, ProductSerializer, CartItemSerializer, CartSerializer, UserRegisteredSerializer, UserSerializer

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    '''
    Gets all products
        requests:
            GET /api/products/ - Get all products
        response:
            Serialized Prodcut Data
    '''
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_product_detail(request, pk):
    '''
    Gets a single product by id
        requests:
            GET /api/products/<id>/ - Get product by id
        response:
            Serialized Prodcut Data
        in case of product not found:
        response:
            {"error": "Product not found"}
    '''
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_category(request):
    '''
    Gets all categories
        requests:
            GET /api/categories/ - Get all categories
        response:
            Serialized Category Data
    '''
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    '''
    Gets the user cart (must be authenticated)
        requests:
            GET /api/cart/ - Get cart of the logged in user
        response:
            Serialized Cart Data
    '''
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request: Response):
    '''        
    Adds a product to the user cart (must be authenticated)
        requests:
            POST /api/cart/add/ - Add product to cart
            EX: 
            {
                "product_id": 3
            }
        response:
            Serialized Cart Data
    '''
    product_id = request.data.get('product_id')
    product = Product.objects.get(id=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity += 1
        item.save()
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request: Response):
    '''
    Removes a product from the user cart (must be authenticated)
        requests:
            DELETE /api/cart/remove/ - Remove product from cart
            EX:
            {
                "item_id": 1
            }
        response:
            {"message": "Item removed from cart"}
    '''
    item_id = request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return Response({"message": "Item removed from cart"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request: Response):
    '''
    Updates the quantity of a cart item (must be authenticated)
        requests:
            POST /api/cart/update/ - Update cart item quantity
            EX:
            {
                "item_id": 1,
                "quantity": 3
            }
        response:
            Serialized Cart Item Data
        in case of item not found:
        response:
            {"error": "Cart item not found"}
    '''
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')
    if not item_id or quantity is None:
        return Response({'error': 'Item ID and quantity are required'}, status=400)
    try:
        item = CartItem.objects.get(id=item_id)
        if int(quantity) < 1:
            item.delete()
            return Response({'error': 'Quantity must be at least 1'}, status=400)
        item.quantity = quantity
        item.save()
        serializer = CartItemSerializer(item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=404)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    '''
    Clears the user cart (must be authenticated)
        requests:
            DELETE /api/cart/clear/ - Clear cart
        response:
            {"message": "Cart cleared successfully"}
    '''
    cart = Cart.objects.get(user=request.user)
    cart.items.all().delete()
    return Response({'message': 'Cart cleared successfully'}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    '''
    Creates an order from the user cart (must be authenticated)
        requests:
            POST /api/orders/create/ - Create order
            EX:
            {
                "name": "John Doe",
                "address": "123 Main St",
                "phone": "1234567890"
            }
        response:
            {"message": "Order created successfully", "order_id": 1}
    '''
    try:
        data = request.data
        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        payment_method = data.get('payment_method', 'COD')

        if not phone.isdigit() or len(phone) < 10:
            return Response({'error': 'Invalid phone number'}, status=400)

        cart, created = Cart.objects.get_or_create(user=request.user)
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)
        
        total = sum(item.subtotal for item in cart.items.all())

        order = Order.objects.create(user=request.user, total_amount=total)
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        cart.items.all().delete()

        return Response({'message': 'Order created successfully', 'order_id': order.id}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    '''
    Registers a new user
        requests:
            POST /api/register/ - Register a new user
            EX:
            {
                "username": "johndoe",
                "email": "johndoe@example.com",
                "password": "password123",
                "password2": "password123"
            }
        response:
            {"message": "User registered successfully", "user": {...}}
    '''
    serializer = UserRegisteredSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User registered successfully', 'user': UserSerializer(user).data}, status=201)
    return Response(serializer.errors, status=400)