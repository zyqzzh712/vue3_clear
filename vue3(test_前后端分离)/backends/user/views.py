from django.shortcuts import render
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('u_id')
    serializer_class = UserSerializer
    