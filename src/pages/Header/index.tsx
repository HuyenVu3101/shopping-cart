import { NavLink } from 'react-router-dom';
import images from '../../images';
import { useAppSelector } from '~/redux/hooks';
import { InitialCart } from '~/models';
import './Header.scss';

function Header() {
  const initialCart: InitialCart = useAppSelector((state) => state.cart);
  const { cart } = initialCart;
  const amount = cart.length;

  const handleClickProducts = () => {};
  return (
    <div className="bg-white h-8 shadow-md">
      <div className="container mx-auto">
        <div className="d-flex align-items-center justify-content-between py-2">
          <div className="d-flex align-items-center gap-4-5 w-33">
            <NavLink className="hover-black text-gray fw-normal   inline-block text-lg  relative " to="/">
              Home
            </NavLink>
            <NavLink
              className="hover-black text-gray fw-normal   inline-block text-lg  relative  fw-semibold active-link"
              to="/products"
              aria-current="page"
              onClick={handleClickProducts}
            >
              Products
            </NavLink>
            <NavLink className="hover-black text-gray fw-normal   inline-block text-lg  relative " to="/reviews">
              Reviews
            </NavLink>
          </div>
          <div className="w-33">
            <h2 className="text-2xl text-blue fw-bold text-center">Beauty.bd</h2>
          </div>
          <div className="w-33">
            <div className="d-flex align-items-center justify-content-end">
              <NavLink
                to="/checkout"
                className="rounded-pill relative d-flex align-items-center justify-content-center text-2xl w-10 h-10 cursor-pointer relative"
              >
                <img src={images.cartBlue} alt="" />
                {amount !== 0 && (
                  <div className="bg-danger text-light rounded-circle d-flex justify-content-center align-items-center amount">
                    {amount}
                  </div>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
