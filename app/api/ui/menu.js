module.exports = [
  {
    key: 'inicio',
    name: 'Inicio',
    icon: 'ion-ios-home-outline',
    child: [
      {
        key: 'ventas_section',
        name: 'Administrador',
        title: true,
      },
      {
        key: 'inicio',
        name: 'Inicio',
        icon: 'ion-ios-home-outline',
        link: 'inicio'
      },
      {
        key: 'perfil',
        name: 'Mi Perfil',
        icon: 'ion-ios-contact-outline',
        link: '/perfil',
      },
      {
        key: 'reportes',
        name: 'Reportes',
        icon: 'ion-ios-pie-outline',
        link: '/reportes',
      },
    ]
  },
  {
    key: 'ventas',
    name: 'Ventas',
    icon: 'ion-ios-cash-outline',
    child: [
      {
        key: 'ventas_section',
        name: 'Gestión de Ventas',
        title: true,
      },
      {
        key: 'nueva_venta',
        name: 'Nueva Venta',
        link: 'nueva-venta',
        icon: 'ion-ios-cart-outline',
      },
      {
        key: 'cotizaciones',
        name: 'Cotizaciones',
        link: 'cotizaciones',
        icon: 'ion-ios-document-outline',
      },
      {
        key: 'cobranzas',
        name: 'Cobranzas',
        link: 'cobranzas',
        icon: 'ion-ios-card-outline',
      },
      {
        key: 'reportes_ventas',
        name: 'Reportes de Ventas',
        title: true,
      },
      {
        key: 'lista_ventas',
        name: 'Listado de Ventas',
        link: 'lista-ventas',
        icon: 'ion-ios-list-outline',
      },
      {
        key: 'lista_cobranzas',
        name: 'Listado de Cobranzas',
        link: 'lista-cobranzas',
        icon: 'ion-ios-clipboard-outline',
      },
      {
        key: 'lista_ordenes',
        name: 'Órdenes de Trabajo',
        link: 'lista-ordenes',
        icon: 'ion-ios-eye-outline',
      }
    ]
  },
  {
    key: 'compras',
    name: 'Compras',
    icon: 'ion-ios-basket-outline',
    child: [
      {
        key: 'compras_section',
        name: 'Gestión de Compras',
        title: true,
      },
      {
        key: 'nueva_compra',
        name: 'Nueva Compra',
        link: 'compras',
        icon: 'ion-ios-add-circle-outline',
      },
      {
        key: 'proveedores',
        name: 'Proveedores',
        link: '/compras/proveedores',
        icon: 'ion-ios-people-outline',
      }
    ]
  },
  {
    key: 'administracion',
    name: 'Administración',
    icon: 'ion-ios-settings-outline',
    child: [
      {
        key: 'usuarios',
        name: 'Usuarios',
        link: '/admin/usuarios',
        icon: 'ion-ios-person-outline',
      },
      {
        key: 'roles',
        name: 'Roles',
        link: '/admin/roles',
        icon: 'ion-ios-keypad-outline',
      },
      {
        key: 'sucursales',
        name: 'Sucursales',
        link: '/admin/sucursales',
        icon: 'ion-ios-pin-outline',
      },
      {
        key: 'optica',
        name: 'Óptica',
        link: '/admin/opticas',
        icon: 'ion-ios-home-outline',
      },
    ]
  },
];
