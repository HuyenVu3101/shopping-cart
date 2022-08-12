import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import images from '~/images';
import { InitialProducts } from '~/models';
import { cartActions } from '~/redux/cart/cartSlice';
import { useAppSelector } from '~/redux/hooks';
import { productActions } from '~/redux/products';
import { ProductDetail } from '~/models/products';
import productApi from '~/api/productApi';
import './Products.scss';

function Products() {
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    productApi.getAllProduct().then((response: ProductDetail[]) => {
      dispatch(productActions.GET_LIST_PRODUCT_SUCCESS(response));
      dispatch(productActions.SET_ID_MAIN_PRODUCT(response[0]));
    });
  }, []);
  const initialProducts: InitialProducts = useAppSelector((state) => state.product);
  const { productList, mainProduct } = initialProducts;
  const { productName, description, imageUrl, price } = mainProduct;

  return (
    <>
      <div className="wrapper-products pt-3-5">
        <div className="container mx-auto h-100">
          <div className="grid grid-cols-12 h-100 gap-3-5">
            <div className="col-span-7 h-100">
              <div className="d-flex flex-column gap-y-3 h-100 p-4-5 shadow-lgx bg-white rounded-3-5 ">
                <div className="h-75">
                  <div className="relative h-100">
                    <div className="absolute w-100 h-100 top-0 start-0 cn-1">
                      <img className="img-main" src={imageUrl} alt="" />
                    </div>
                  </div>
                </div>
                <div className="h-25 grid grid-cols-12">
                  <div className="col-span-12 mb-3">
                    <div className="grid grid-cols-12 w-100">
                      <div className="col-span-10">
                        <h2 className="text-4xl fw-normal mb-2">{productName}</h2>
                        <p className="fw-normal fw-light text-gray-700">{description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="d-flex align-items-center justify-content-between mt-3-5">
                      <div className="w-1-6">
                        <div className="d-flex align-items-center justify-content-between bg-gray-200 rounded-3-5 p-1 ">
                          <button
                            className={
                              amount !== 1
                                ? 'd-flex align-items-center outline-none border-0 bg-transparent  p-2 fs-3 fw-bold lh-1 pt-0  btn-amount'
                                : 'd-flex align-items-center outline-none border-0 bg-transparent  p-2 fs-3 fw-bold lh-1 pt-0'
                            }
                            disabled={amount === 1 ? true : false}
                            onClick={() => {
                              setAmount((prev: number) => (prev !== 1 ? --prev : prev));
                            }}
                          >
                            -
                          </button>
                          <div className="text-black fw-semibold text-lg p-1">{amount}</div>
                          <button
                            className="d-flex align-items-center justify-content-center outline-none border-0 bg-transparent p-2 fs-3 fw-bold lh-1 pt-0 btn-amount"
                            onClick={() => {
                              setAmount((prev: number) => ++prev);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right d-flex align-items-center gap-4-5">
                        <p className="mb-0 fw-bold  text-3xl">${price}</p>
                        <button
                          className="d-flex align-items-center border-0 justify-content-center duration-100 shadow-md gap-2 px-4 py-2-5 text-lg rounded-3-5 bg-blue-500 text-light hover-blue false gap-2"
                          onClick={() => {
                            toast.success('👏 Added successfully!', {
                              icon: false,
                              theme: 'colored',
                              position: 'bottom-left',
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });

                            dispatch(
                              cartActions.SET_CART({
                                ...mainProduct,
                                amount,
                                allPrice: amount * price,
                              }),
                            );
                          }}
                        >
                          <img src={images.cartWhite} alt="" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-5 h-100 overflow-auto rounded-3-5 overflow-scroll-hidden">
              <div className="grid grids-col-12 gap-3 h-auto">
                {productList &&
                  productList.length > 0 &&
                  productList.map((item: ProductDetail) => {
                    const { productId, productName, description, imageUrl, price } = item;
                    return (
                      <div className="col-span-12" key={productId}>
                        <div className="d-flex h-11 gap-3 px-4 py-4 rounded-3-5 bg-white shadow-lgx ">
                          <div className="w-33 ms-2 cn-2">
                            <img className="img-item" src={imageUrl} alt="" />
                          </div>
                          <div className="w-66 d-flex flex-column justify-content-between">
                            <div>
                              <h4
                                className="text-xl cursor-pointer hover-text-blue fw-semibold"
                                onClick={() => {
                                  dispatch(productActions.SET_ID_MAIN_PRODUCT(item));
                                }}
                              >
                                {productName}
                              </h4>
                              <p className="fw-normal fw-light text-gray-700">{description}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <h3 className="text-2xl fw-semibold">${price}</h3>
                              <button className="d-flex align-items-center justify-content-center duration-100 shadow-md gap-2 px-4 py-2 fw-normal bg-white border-0 text-blue hover-blue shadow-none ">
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {(!productList || productList.length === 0) && (
        <div className=" w-100 h-100 opacity-50 d-flex bg-secondary loading">
          <div className="spinner-border m-auto" role="status"></div>
        </div>
      )}
    </>
  );
}
export default Products;
