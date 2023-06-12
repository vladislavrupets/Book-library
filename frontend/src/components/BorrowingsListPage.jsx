import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserBorrowingsbyLogin } from "../store/userSlice";

const BorrowingsListPage = () => {
  const { login } = useParams();

  const dispatch = useDispatch();
  const { usersBorrowings, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserBorrowingsbyLogin(login));
  }, []);

  return (
    <div className="content-container">
      <div className="content-container__header">
        <h2 className="content-container__header-title">My Borrowings</h2>
      </div>
      <div className="content-container__item">
        <div className="card">
          <div className="card__body">
            <div className="card__body-container">
              <div className="card__body-container--item">
                {status === "loading" && <div>Loading...</div>}
                {status === "rejected" && <div>{error}</div>}
                {status === "resolved" && (
                  <div className="dash-book-card">
                    <table className="table">
                      <thead className="table__header">
                        <tr>
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
                              Status
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table__body">
                        {usersBorrowings.map((borrowing) => (
                          <tr
                            className="table__row"
                            key={borrowing.borrowing_id}
                          >
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
                                  {borrowing.start_date}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {borrowing.end_date}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {borrowing.status}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowingsListPage;
