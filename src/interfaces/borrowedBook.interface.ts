export interface IBorrowedBookDetails {
    id: string;
    userId: string;
    bookId: string;
    bookTitle: string;
    userName: string;
    borrowDay: Date;
    updatedDate?: Date;
    status: string;
}