import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check } from "@mui/icons-material";

import {
  getActiveBorrowings,
  approveReturn,
} from "../../../store/borrowingSlice";

import Pagination from "../../custom-elements/pagination/Pagination";

const itemsPerPage = 10;

const ActiveBorrowings = () => {
  const dispatch = useDispatch();
  const { borrowings, borrowingsCount, status, error } = useSelector(
    (state) => state.borrowing
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getActiveBorrowings());
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickApprove = (borrowingId) => {
    const actualEndDate = new Date().toISOString().split("T")[0];
    try {
      dispatch(approveReturn({ borrowingId, actualEndDate })).unwrap();
      dispatch(getActiveBorrowings());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="content-container">
      <div className="content-container__header">
        <h2 className="content-container__header-title">Borrowings</h2>
      </div>
      <div className="content-container__item">
        <div className="card">
          <div className="card__header">
            <h3 className="card__header-title">Active Borrovings</h3>
          </div>
          <div className="card__body">
            {status === "loading" && <div>Loading...</div>}
            {status === "rejected" && <div>{error}</div>}
            {status === "resolved" && (
              <div className="card__body-container">
                <div className="card__body-container--item">
                  <div className="table-card">
                    <table className="table">
                      <thead className="table__header">
                        <tr>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              User
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Book
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Borrowing date
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Return date
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Librarian login
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Librarian name
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Approve book return
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table__body">
                        {borrowings.map((borrowing) => (
                          <tr
                            className="table__row"
                            key={borrowing.borrowing_id}
                          >
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {borrowing.user_login}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {borrowing.title}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {new Date(
                                    borrowing.start_date
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {new Date(
                                    borrowing.end_date
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {borrowing.librarian_login}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {borrowing.librarian_name}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  <button
                                    className="main-button visible"
                                    onClick={() =>
                                      handleClickApprove(borrowing.borrowing_id)
                                    }
                                  >
                                    <Check fontSize="small" />
                                    <span>Approve</span>
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card__body-container--item">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(borrowingsCount / itemsPerPage)}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveBorrowings;
