export const selectIsAuthenticated = ({ auth }) => auth.isAuthenticated;
export const selectUser = ({ auth }) => auth.user;
export const selectLoading = ({ auth }) => auth.loading;
export const selectNotification = ({ auth }) => auth.notification;
