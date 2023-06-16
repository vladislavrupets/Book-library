import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check } from "@mui/icons-material";

import { getUsers } from "../../../store/userSlice";

import Pagination from "../../custom-elements/pagination/Pagination";

const itemsPerPage = 10;

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleClickApprove = (borrowingId) => {
  //   const actualEndDate = new Date().toISOString().split("T")[0];
  //   try {
  //     dispatch(approveReturn({ borrowingId, actualEndDate })).unwrap();
  //     dispatch(getActiveBorrowings());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="content-container">
      <div className="content-container__header">
        <h2 className="content-container__header-title">Users</h2>
      </div>
      <div className="content-container__item">
        <div className="card">
          <div className="card__header">
            <h3 className="card__header-title">User list</h3>
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
                              Full Name
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Login
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Phone number
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              trust_rating
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table__body">
                        {users.map((user) => (
                          <tr className="table__row" key={user.user_id}>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {user.full_name}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {user.login}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {user.phone_number}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {user.trust_rating}
                                </div>
                              </div>
                            </td>
                            {/* <td className="table__row-item">
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
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
