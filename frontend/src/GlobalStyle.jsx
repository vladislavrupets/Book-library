import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* content container */
.content-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}

.content-container__item{
  margin: 20px 0;
}

/* link-button */
.link-button {
  display: flex;
  margin: 0 10px;
  padding: 3px 7px;
  font-size: 16px;
  cursor: pointer;
}

.link-button.approve:hover {
  background-color: #d8e8fa;
  border-radius: 10px;
}

.link-button.cancel {
  color: #ff0000;
}

.link-button.cancel:hover {
  background-color: #ffdbdb;
  border-radius: 10px;
}

.link-button__content {
  margin-top: 1px;
}

/* link */
.link {
  text-decoration: none;
}

.link.inactive {
  color: inherit;
}

.link.active {
  color: #007aff;
}`;

export default GlobalStyle;
