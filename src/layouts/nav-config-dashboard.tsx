import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Usuarios',
    path: '/user',
    icon: icon('ic-user'),
  },
  // 👇 AÑADE ESTE OBJETO PARA TU PÁGINA DE CLIENTES 👇
  {
    title: 'Clientes',
    path: '/clientes',
    icon: icon('ic-user'), // Puedes reutilizar un ícono existente
  },
  {
    title: 'Productos',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Iniciar Sesión',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Página no encontrada',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];