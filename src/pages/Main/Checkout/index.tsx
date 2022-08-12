import './Checkout.scss';
import { useAppSelector } from '~/redux/hooks';
import { cartActions } from '~/redux/cart';
import { useDispatch } from 'react-redux';
import { Cart, InitialCart, ProductsInOrder } from '~/models';
import images from '~/images';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialCart: InitialCart = useAppSelector((state) => state.cart);
  const { cart } = initialCart;

  const handleTrash = (item: Cart) => {
    const newCart = cart.filter((i) => item !== i);
    dispatch(cartActions.SET_DELETE_CART(newCart));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    } else {
      if (window.confirm('Do you want to purchase !!')) {
        let x: ProductsInOrder[] = [];
        cart.forEach((item: Cart) => {
          x.push({ productId: item.productId.toString(), quantity: item.amount });
        });
        const payment = { paySuccess: true, productsInOrder: x };
        dispatch(cartActions.CHECKOUT(payment));
        navigate('/products');
        toast.success('👏Checkout successfully !!!', {
          icon: false,
          theme: 'colored',
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  let subTotal = 0;
  const shippingCost = cart && cart.length > 0 ? 10 : 0;

  return (
    <div className="rounded-lg mx-auto overflow-hidden bg-transparent container px-12 h-100">
      <div className="pt-4 gap-4">
        <div className="p-3 bg-white  rounded-3 fw-bold shadow-lgx">
          <div className="w-full text-center font-semibold">My Shopping Cart</div>
        </div>

        <div className="d-flex  pt-4">
          <div className="col-8 d-flex justify-content-center ">
            {cart && cart.length > 0 ? (
              <div className="d-flex flex-column  me-4 product-list">
                {cart.map((item: Cart, index) => {
                  const { imageUrl, productName, description, price, amount, allPrice } = item;
                  subTotal += allPrice;
                  return (
                    <div className="d-flex h-11 gap-3 px-4 py-4 rounded-3-5 bg-white shadow-lgx mb-3" key={index}>
                      <div className="w-33 ms-2 cn-2">
                        <img className="img-item" src={imageUrl} alt="" />
                      </div>
                      <div className="w-66 d-flex flex-column justify-content-between">
                        <div>
                          <div className="d-flex justify-content-between">
                            <h4 className="text-xl cursor-pointer hover-text-blue fw-semibold ">{productName}</h4>
                            <img
                              className="cursor-pointer"
                              src={images.trash}
                              alt=""
                              onClick={() => {
                                handleTrash(item as Cart);
                              }}
                            />
                          </div>
                          <p className="fw-normal fw-light text-gray-700 pe-5">{description}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center justify-content-between bg-gray-200 rounded-3 p-1 ">
                            <button
                              className="d-flex align-items-center outline-none border-0 bg-transparent  p-2 px-4"
                              // disabled
                              onClick={() => {
                                cart && dispatch(cartActions.SET_ITEM_CART_MINUS(item));
                              }}
                            >
                              <img src={images.minus} alt="" />
                            </button>
                            <div className="text-black fw-semibold text-lg ">{amount}</div>
                            <button
                              className="d-flex align-items-center outline-none border-0 bg-transparent p-1 px-4 "
                              onClick={() => {
                                dispatch(cartActions.SET_ITEM_CART_PLUS(item));
                              }}
                            >
                              <img src={images.plus} alt="" />
                            </button>
                          </div>
                          <h3 className="text-2xl fw-bold fs-3">${(price * amount).toFixed(2)}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h4 className="text-center fw-bold m-auto">You have no products in cart</h4>
            )}
          </div>

          <div className="col-4 px-0 ">
            <div className="bg-white p-3 rounded-3">
              <h6 className="text-lg font-medium">Order Info</h6>
              <div className="col-span-12 text-lg">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="font-light text-gray-700">Subtotal:</p>
                  <p className="fw-semibold">${subTotal.toFixed(2)}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between ">
                  <p className="font-light text-gray-700">Shipping Cost:</p>
                  <p className=" fw-semibold">${shippingCost}</p>
                </div>

                <div className="col-span-12">
                  <div className="d-flex align-items-center justify-content-between  text-3xl fw-bold">
                    <p className="">Total:</p>
                    <p className="">${(subTotal + shippingCost).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100">
              <button
                className={
                  cart && cart.length !== 0
                    ? 'd-flex align-items-center justify-content-center duration-100 shadow-md  px-4 py-2 mt-3 outline-none border-0 rounded-3 bg-blue-500 text-white cursor-pointer w-100 fw-semibold'
                    : 'd-flex align-items-center justify-content-center duration-100 shadow-md  px-4 py-2 mt-3 outline-none border-0 rounded-3 bg-blue-500 text-white  opacity-50 w-100 fw-semibold'
                }
                disabled={cart && cart.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
            <div className="col-span-12">
              <button
                className="d-flex align-items-center justify-content-center duration-100 shadow-md  px-4 py-2 mt-3
    border border-primary rounded-3 fw-semibold text-blue w-100"
                onClick={() => {
                  navigate('/products');
                }}
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
