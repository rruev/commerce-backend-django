from django.urls import path, include
from rest_framework import routers
# from dj_rest_auth.registration.views import RegisterView
# from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView

from .views import UserViewSet, RegisterView, LoginView, LogoutView, SessionView, get_csrf_token


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('csrf/', get_csrf_token),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('session/', SessionView.as_view(), name='user_detailes'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]