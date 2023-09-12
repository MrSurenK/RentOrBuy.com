from django.shortcuts import render

# Create your views here.
from django.utils.timezone import now
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['nric'] = user.nric
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['is_Active'] = user.is_active
        # To convert datetime to the right format. This method works granted that it is a field that is no nullable
        token['account_creation_date'] = user.account_creation_date.strftime('%d/%m/%Y')
        token['last_login'] = user.last_login.strftime('%d/%m/%Y')
        default_profile_pic_path = 'profile_pics/default.jpg'
        if user.profile_pic and user.profile_pic.name != default_profile_pic_path:
            token['profile_pic'] = user.profile_pic.url
        else:
            token['profile_pic'] = None


        user.last_login=now()
        user.save(update_fields=['last_login'])


        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
