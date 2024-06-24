
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export const BASE_URL = "https://store.istad.co/api/";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.results);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
      });
  }, []);

  const handleViewProduct = (product) => {
    setProductDetail(product);
    setOpenModal(true);
  };

  const handleDeleteProduct = (id) => {
    setDeleteModal(true);
    setSelectedProductId(id);
  };

  const confirmDeleteProduct = () => {
    const newProductList = products.filter((product) => product.id !== selectedProductId);
    setProducts(newProductList);
    setDeleteModal(false);
  };

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.name,
    },
    {
      name: "Image",
      selector: (row) => (
        <div>
          <img src={row.image} alt={row.name} width={'90'} height={'90'} />
        </div>
      ),
    },
    {
      name: "Price (USD)",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Seller",
      selector: (row) => row.seller,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button onClick={() => handleViewProduct(row)} className="mr-2 text-blue-600">View</button>
          <button onClick={() => handleDeleteProduct(row.id)} className="text-red-500"><RiDeleteBin5Fill /></button>
        </div>
      ),
    },
  ];

  return (
    <section>
      <DataTable
        columns={columns}
        data={products}
        fixedHeader
        pagination
        pointerOnHover
        highlightOnHover
      />

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Product Detail</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <img className="w-40 h-40 object-cover align-center rounded-lg" src={productDetail?.image || "../assets/img1.png"} alt="" />
            <h2 className="text-[30px] text-blue-600 font-bold">{productDetail?.name || "Unknown"}</h2>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-700 text-[20px]">
              {productDetail?.desc || "Product not found"}
            </p>
            <h3 className="text-[30px] text-red-400">{productDetail?.price || "Price not found"}$</h3>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={deleteModal} size="md" onClose={() => setDeleteModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmDeleteProduct}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}
