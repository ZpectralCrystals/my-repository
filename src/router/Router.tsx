import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas públicas
import Inicio from "../pages/Inicio/Inicio";
import Menu from "../pages/Menu/Menu";
import Blog from "../pages/Blog/Blog";
import Contacto from "../pages/Contacto/Contacto";
import Recomendaciones from "../pages/Recomendaciones/Recomendaciones";
import Carrito from "../pages/Carrito/Carrito";
import Paginas from "../pages/Paginas/Paginas";

// Páginas administrativas
import Category from "../pagesAdmin/Category/Category";
import Discounts from "../pagesAdmin/Discounts/Discounts";
import Products from "../pagesAdmin/Products/Products";

// Layout general
import Layout from "@/components/Layout/Layout";

// Login Page
import LoginPage from "../pages/Login/Login";

// Protected Route and Admin Layout
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import AdminLayout from "../components/Layout/AdminLayout";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con Layout general */}
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/recomendaciones" element={<Recomendaciones />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/paginas" element={<Paginas />} />
        </Route>

        {/* Ruta de Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="categorias" element={<Category />} />
          <Route path="productos" element={<Products />} />
          <Route path="promociones" element={<Discounts />} />
          {/* Example of an index route for /admin, redirecting to products */}
          {/* <Route index element={<Navigate to="productos" replace />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;