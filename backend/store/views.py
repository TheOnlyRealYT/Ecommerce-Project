from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from rest_framework import status
from .models import Category, Product, Cart, CartItem, Order, OrderItem
from .serializers import CategorySerializer, ProductSerializer, CartItemSerializer, CartSerializer, UserRegisteredSerializer, UserSerializer

# Create your views here.
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product_detail(request, pk):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
def get_category(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request: Response):
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
    item_id = request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return Response({"message": "Item removed from cart"})

@api_view(['POST'])
def update_cart_quantity(request: Response):
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
    cart = Cart.objects.get(user=request.user)
    cart.items.all().delete()
    return Response({'message': 'Cart cleared successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
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

        return Response({'message': 'Order created successfully', 'order_id': order.id})

    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegisteredSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User registered successfully', 'user': UserSerializer(user).data}, status=201)
    return Response(serializer.errors, status=400)