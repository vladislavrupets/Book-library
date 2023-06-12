import { useDispatch, useSelector } from "react-redux";

const BorrowingsListPage = () => {
  const dispatch = useDispatch();
  const { usersBorrowings, status, error } = useSelector((state) => state.user);
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
                              <span>Cover</span>
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Title
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Genres
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Authors
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Publisher
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Release year
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Pages count
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Quantity
                            </div>
                          </th>
                          <th className="table__header-item">
                            <div className="table__header-item--content">
                              Edit book
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table__body">
                        {books.map((book) => (
                          <tr className="table__row" key={book.book_id}>
                            <td className="table__row-item">
                              <div
                                className="book-cover"
                                style={{
                                  backgroundImage: `url(${book?.cover_url})`,
                                }}
                              ></div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {book.writing.title}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                {book?.genres?.map((genre) => (
                                  <div className="table__row-item--content-inner">
                                    <span key={genre.genre_id}>
                                      {genre.genre_name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                {book.authors.map((author) => (
                                  <div className="table__row-item--content-inner">
                                    <span key={author.author_id}>
                                      {author.full_name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {book.publisher.publisher_name}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {book.release_year}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {book.pages_count}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  {book.quantity}
                                </div>
                              </div>
                            </td>
                            <td className="table__row-item">
                              <div className="table__row-item--content">
                                <div className="table__row-item--content-inner">
                                  <button
                                    className="main-button visible"
                                    onClick={() =>
                                      navigate("/dashboard/books/edit-book")
                                    }
                                  >
                                    <Edit fontSize="small" />
                                    <span>Edit</span>
                                  </button>
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
