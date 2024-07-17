from rest_framework import pagination


class NhaHangTiecCuoiPaginator(pagination.PageNumberPagination):
    page_size = 20

