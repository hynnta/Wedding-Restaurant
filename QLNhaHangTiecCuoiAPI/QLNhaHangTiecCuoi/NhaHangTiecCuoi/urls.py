from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(prefix='loaisanhs', viewset=views.LoaiSanhViewSet, basename='loaisanh')
router.register(prefix='sanhs', viewset=views.SanhViewSet, basename='sanh')
router.register(prefix='dichvus', viewset=views.DichVuViewSet, basename='dichvu')
router.register(prefix='menus', viewset=views.MenuViewSet, basename='menu')
router.register(prefix='users', viewset=views.UserViewSet, basename='user')
router.register(prefix='tieccuoi', viewset=views.TiecCuoiViewSet, basename='tieccuoi')
router.register(prefix='tieccuoi-detail', viewset=views.TiecCuoiDetailViewSet, basename='tieccuoi-detail')
router.register(prefix='reports', viewset=views.ReportViewSet, basename='reports')
router.register(prefix='hoadons', viewset=views.HoaDonViewSet, basename='hoadons')
router.register(prefix='chitiethoadons', viewset=views.ChiTietHoaDonViewSet, basename='chitiethoadons')

urlpatterns = [
    path('', include(router.urls)),
]