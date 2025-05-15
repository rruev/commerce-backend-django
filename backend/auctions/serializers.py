from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="A user with this email already exists."
            )
        ]
    )

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }