import React from "react";
import AppLayout from "../base/Layout/AppLayout";
import BookList from "../components/books/BookList/BookList";

const Books = () => {
  return (
    <AppLayout>
      <BookList />
    </AppLayout>
  );
};

export default Books;
