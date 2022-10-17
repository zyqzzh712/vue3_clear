from django.shortcuts import render
from rest_framework import viewsets
from .models import Lyb
from .serializers import LybSerializer
# Create your views here.
class LybViewSet(viewsets.ModelViewSet):
    #     order_by('-posttime')日期降序排序
    queryset = Lyb.objects.all().order_by('-posttime')
    serializer_class = LybSerializer
