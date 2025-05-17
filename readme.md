# Library Manager

## 1. **Giới Thiệu**

Library Manager là một ứng dụng quản lý thư viện, cho phép quản lý sách, người dùng, và các bản ghi mượn/trả sách. Ứng dụng được xây dựng bằng **HTML**, **CSS**, **TypeScript**, và sử dụng **Webpack** để build.

---

## 2. **Cách Chạy Project**

### **Yêu Cầu:**

- **Node.js**: Đảm bảo đã cài đặt Node.js trên máy.
- **Webpack**: Dùng để build project.
- **TypeScript**: Được sử dụng để viết mã nguồn.

### **Các Bước Chạy:**

1. **Cài đặt các package**:
   ```bash
   npm install
   ```
2. **Build project**:

   ```bash
   npm run build
   ```

   - Lệnh này sử dụng Webpack để biên dịch TypeScript thành JavaScript và tạo file `bundle.js` trong thư mục dist.

3. **Chạy project**:
   - Mở file index.html trong trình duyệt để chạy ứng dụng.

---

## 3. **Kiến Thức Đã Áp Dụng Trong Project**

### 3.1 **Generic Type**

- **Generic Type**: Được sử dụng để tạo các class có thể hoạt động với nhiều kiểu dữ liệu khác nhau.
  - **Ví dụ**:
    ```ts
    export class BaseService<T extends { id: string }> {
    	create(item: T): T {
    		// ...
    	}
    }
    ```
    - **Áp dụng**: Trong file `base.service.ts`, `BaseService` là một class generic được sử dụng để quản lý các thực thể như `Book`, `User`, và `Borrowed`.

---

### 3.2 **Type Guard**

Type Guard được sử dụng để kiểm tra kiểu dữ liệu tại runtime.

#### **1. `typeof`**

- Kiểm tra kiểu dữ liệu nguyên thủy.
  - **Ví dụ**:
    ```ts
    if (typeof date === "string") {
    	date = new Date(date);
    }
    ```
    - **Áp dụng**: Trong file `utils.ts`, `typeof` được sử dụng để kiểm tra kiểu dữ liệu của ngày.

#### **2. `instanceof`**

- Kiểm tra một đối tượng có phải là instance của một class hay không.
  - **Ví dụ**:
    ```ts
    if (element instanceof HTMLInputElement) {
    	// ...
    }
    ```
    - **Áp dụng**: Trong file `utils.view.ts`, `instanceof` được sử dụng để kiểm tra kiểu của các phần tử DOM.

#### **3. `in`**

- Kiểm tra một thuộc tính có tồn tại trong một đối tượng hay không.
  - **Ví dụ**:
    ```ts
    if ("id" in updateBorrow) {
    	// ...
    }
    ```
    - **Áp dụng**: Trong file `borrowed.controller.ts`, `in` được sử dụng để kiểm tra sự tồn tại của thuộc tính trong đối tượng.

---

### 3.3 **Type Assertion**

- **Type Assertion**: Dùng để ép kiểu dữ liệu khi TypeScript không thể tự suy luận.
  - **Ví dụ**:
    ```ts
    const userTable = document.getElementById("table-user") as HTMLTableElement;
    ```
    - **Áp dụng**: Trong file user.view.ts, `as` được sử dụng để ép kiểu các phần tử DOM.

---

### 3.4 **Interface**

- **Interface**: Được sử dụng để định nghĩa cấu trúc dữ liệu.
  - **Ví dụ**:
    ```ts
    export interface IUser {
    	id: string;
    	name: string;
    	dayCreated: Date;
    }
    ```
    - **Áp dụng**: Trong file `user.model.ts`, interface `IUser` được sử dụng để định nghĩa cấu trúc dữ liệu người dùng.

---

### 3.5 **Non-Null Assertion Operator (`!`)**

- **`!`**: Được sử dụng để khẳng định rằng một giá trị không phải là `null` hoặc `undefined`.
  - **Ví dụ**:
    ```ts
    const form = document.getElementById("form-user")!;
    ```
    - **Áp dụng**: Trong file user.view.ts, `!` được sử dụng để đảm bảo rằng phần tử DOM tồn tại.

---

## 4. **Tổng Kết**

Project **Library Manager** đã áp dụng nhiều kiến thức TypeScript nâng cao để xây dựng một ứng dụng quản lý thư viện:

- **Generic Type**: Tạo các class tái sử dụng.
- **Type Guard**: Đảm bảo an toàn kiểu dữ liệu tại runtime.
- **Type Assertion**: Giúp TypeScript hiểu rõ hơn về kiểu dữ liệu.
- **Interface**: Định nghĩa cấu trúc dữ liệu rõ ràng.
- **Non-Null Assertion Operator**: Giảm thiểu lỗi liên quan đến `null` hoặc `undefined`.
