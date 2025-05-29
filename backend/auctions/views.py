from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.views.decorators.http import require_GET
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@ensure_csrf_cookie
@require_GET
def get_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set'})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({'message': 'Logged in successfully'}, status=200)
        return Response({'message': 'Invalid credentials'}, status=400)
    

# @method_decorator(csrf_protect, name='dispatch')
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfuly'}, status=200)
    

# @method_decorator(csrf_protect, name='dispatch')
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            validated_data = serializer.validated_data
            username = validated_data.get('username')
            email = validated_data.get('email')
            password = validated_data.get('password')
            confirmation = request.data.get('confirmation')

            if password != confirmation:
                return Response({"message": "password and confirmation do not match"}, status=400)

            user = User.objects.create_user(username, email, password)
            # login(request, user)
            user_serializer = UserSerializer(user, context={'request': request})
            return Response(user_serializer.data, status=200)
        
        errors = serializer.errors
        first_key = next(iter(errors), None)
        if first_key:
            message = errors[first_key][0]
        else:
            message = 'Something went wrong'

        return Response({'message': message}, status=400)
    


class SessionView(APIView):
    permission_classes = [IsAuthenticated]
    # @login_required
    def get(self, request):
        print(request.COOKIES)
        print(request.user.is_authenticated)
        print(request.user)
        # serializer = UserSerializer(request.user, context={'request': request})
        return JsonResponse({
            "username": request.user.username
        })
