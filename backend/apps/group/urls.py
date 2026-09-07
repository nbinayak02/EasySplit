from django.urls import path

from apps.group.views import (
    GroupDetailView,
    GroupsView,
    JoinGroupView,
    LeaveGroupView,
    PublicGroupDetailView,
    RemoveUserView,
    UpdateGroupImageView,
    UserJoinedGroupsListView,
    ValidateUserGroupJoined,
)

urlpatterns = [
    path("", GroupsView.as_view()),
    path("user/", UserJoinedGroupsListView.as_view()),
    path("user/<str:public_group_id>/", ValidateUserGroupJoined.as_view()),
    path("join/<str:public_group_id>/", JoinGroupView.as_view()),
    path("leave/<int:group_id>/", LeaveGroupView.as_view()),
    path("view/<str:public_group_id>/", PublicGroupDetailView.as_view()),
    path("<int:group_id>/remove/user/<int:user_id>/", RemoveUserView.as_view()),
    path("<int:group_id>/", GroupDetailView.as_view()),
    path("profile-image/<int:group_id>/", UpdateGroupImageView.as_view()),
]
