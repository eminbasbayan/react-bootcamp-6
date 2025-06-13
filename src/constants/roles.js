export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.USER]: ['read:products', 'read:profile', 'write:profile', 'read:orders'],
  [USER_ROLES.ADMIN]: [
    'read:products', 'write:products', 'delete:products',
    'read:users', 'write:users',
    'read:orders', 'write:orders',
    'read:dashboard', 'read:reports'
  ],
  [USER_ROLES.SUPER_ADMIN]: ['*'] // Tüm yetkiler
};

export const isAdmin = (role) => {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;
};

export const isSuperAdmin = (role) => {
  return role === USER_ROLES.SUPER_ADMIN;
};

export const hasPermission = (userRole, permission) => {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes('*') || permissions.includes(permission);
}; 