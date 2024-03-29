import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check } from "@mui/icons-material";

import {
  getBorrowingRequests,
  approveBorrowing,
  rejectBorrowing,
} from "../../../store/borrowingSlice";

import Pagination from "../../custom-elements/pagination/Pagination";

const itemsPerPage = 10;

const BorrowingRequests = () => {
  const dispatch = useDispatch();
  const { borrowings, borrowingsCount, status, error } = useSelector(
    (state) => state.borrowing
  );
  const { authInfo } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getBorrowingRequests());
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickAccept = (borrowingId) => {
    try {
      dispatch(approveBorrowing(borrowingId)).unwrap();
    } catch (err) {
      console.error(err);
    }
    dispatch(getBorrowingRequests());
  };

  const handleClickReject = (borrowingId) => {
    try {
      dispatch(rejectBorrowing(borrowingId)).unwrap();
    } catch (err) {
      console.error(err);
    }
    dispatch(getBorrowingRequests());
  };

  const checkStartDate = (startDate) => {
    const today = new Date().toISOString().split("T")[0];
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    return formattedStartDate <= today;
  };

  return (
    <div className="content-container">
      <div className="content-container__header">
        <h2 className="content-container__header-title">Borrowings</h2>
      </div>
      <div className="content-container__item">
        <div className="card">
          <div className="card__header">
            <h3 className="card__header-title">Borrowing Requests</h3>
          </div>
          <div className="card__body">
            {status === "loading" && <div>Loading...</div>}
            {status === "rejected" && <div>{error}</div>}
            {status === "resolved" && (
              <div className="card__body-container">
                <div className="card__body-container--item">
                  <div className="dash-book-card">
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
                              Trust rating
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
                              Accept borrowing
                            </div>
                          </th>
                          {authInfo.category === "administrator" && (
                            <th className="table__header-item">
                              <div className="table__header-item--content">
                                Reject borrowing
                              </div>
                            </th>
                          )}
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
                                  {borrowing.login}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {borrowing.trust_rating}
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
                                  {checkStartDate(borrowing.start_date) ? (
                                    <button
                                      className="main-button visible"
                                      onClick={() =>
                                        handleClickAccept(
                                          borrowing.borrowing_id
                                        )
                                      }
                                    >
                                      <Check fontSize="small" />
                                      <span>Accept</span>
                                    </button>
                                  ) : (
                                    <span>Waiting</span>
                                  )}
                                </div>
                              </div>
                            </td>
                            {authInfo.category === "administrator" && (
                              <td className="table__row-item">
                                <div className="table__row-item--content">
                                  <div className="table__row-item--content-inner">
                                    <button
                                      className="main-button visible"
                                      onClick={() =>
                                        handleClickReject(
                                          borrowing.borrowing_id
                                        )
                                      }
                                    >
                                      <Check fontSize="small" />
                                      <span>Reject</span>
                                    </button>
                                  </div>
                                </div>
                              </td>
                            )}
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

export default BorrowingRequests;
