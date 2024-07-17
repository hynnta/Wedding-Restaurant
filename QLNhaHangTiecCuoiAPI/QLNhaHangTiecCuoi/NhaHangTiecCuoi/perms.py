from rest_framework import permissions


class ReportOwnerPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, report):
        """
        Return `True` if permission is granted, `False` otherwise.
        """

        return request.user == report.user