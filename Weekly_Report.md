# TKXDPM.VN.20231-01

Weely report file of group 10

## Team member

| Name           | Role        |
| :------------- | :---------- |
| Nguyễn Việt Hưng | Team Leader |
| Phạm Việt Hoàng   | Member      |
| Lê Văn Hùng    | Member      |
| Vi Lô Hùng    | Member      |

## Report Content

<details>
  <summary>W13: 27/11/2023~02/12/2023 </summary>
<br>
<details>
<summary>Nguyễn Việt Hưng</summary>
<br>

- Assigned tasks:
  -Stamp and Data coupling 

- Implementation details:
  - Pull Request(s): https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/1
  - Specific implementation details:
    - Find and mark all stamp and data coupling in this application 

</details>

<details>
<summary>Phạm Việt Hoàng</summary>
<br>

- Assigned tasks:
  - Content coupling

- Implementation details:
  - Pull Request(s): https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/2
  - Specific implementation details:
    - Find and mark all methods that have content coupling issues

</details>

<details>
<summary>Lê Văn Hùng</summary>
<br>

- Assigned tasks:
  - control coupling

- Implementation details:
  - Pull Request(s): https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/3
  - Specific implementation details:
    - Tìm và comment control coupling

</details>

<details>
<summary>Vi Lô Hùng</summary>
<br>

- Assigned tasks:
  - Common coupling

- Implementation details:
  - Pull Request(s): 
  - Specific implementation details: https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/4
    - Find and comment methods that have common coupling

</details>

</details>

<details>
  <summary>W14: 04/12/2023~09/12/2023 </summary>
<br>
<details>
<summary>Nguyễn Việt Hưng</summary>
<br>

- Assigned tasks:
  - Find functional cohesion

- Implementation details:
  - Pull Request(s): [pull request link](https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/7)
  - Specific implementation details:
    - Find out all functional cohesion in project

</details>

<details>
<summary>Phạm Việt Hoàng</summary>
<br>

- Assigned tasks:
  - Communication Cohesion

- Implementation details:
  - Pull Request(s): [pull request link](https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/8)
  - Specific implementation details:
    - Find out all communicational cohesion in project

</details>

<details>
<summary>Lê Văn Hùng</summary>
<br>

- Assigned tasks:
  - coincidental and logical cohesion

- Implementation details:
  - Pull Request(s): https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/6
  - Specific implementation details:
    - Tìm coincidental và logical cohesion

</details>

<details>
<summary>Vi Lô Hùng</summary>
<br>

- Assigned tasks:
  - temporal cohesion and procedural cohesion

- Implementation details:
  - Pull Request(s): [pull request link](https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/9)
  - Specific implementation details:
    - Find temporal and procedural cohesion 

</details>

</details>

<details>
  <summary>W15: 11/12/2023~17/12/2023 </summary>
<br>
<details>
<summary>Nguyễn Việt Hưng</summary>
<br>

- Assigned tasks:
  -Tìm các class vi phạm nguyên tắc thiết kế I

- Implementation details:
  - Pull Request(s): https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/11
  - Specific implementation details:
    - Không phát hiện việc vi phạm nguyên tắc thiết kế I
    - Số lượng interface trong prj tương đối hạn chế, chỉ có InterbankInterface
    - Chỉ có InterbankSubSystem implement InterbankInterface
    - Chi tiết <img width="450" alt="image" src="https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/assets/85723850/6ab1ca57-9b15-4fe4-b874-b2a030a7aedc">
    <img width="475" alt="image" src="https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/assets/85723850/d77e01cb-e181-478b-a727-c778106ab6cd">



</details>

<details>
<summary>Phạm Việt Hoàng</summary>
<br>

- Assigned tasks:
  - Tìm các class vi phạm nguyên tắc thiết kế S và D

- Implementation details:
  - Pull Request(s): https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/10
  - Specific implementation details:
    - Phát hiện vi phạm nguyên tắc thiết kế về SRP ở các file: Cart.java và Order.java
    - Cart.java: lớp Cart phụ trách nhiệm vụ quản lý danh sách Media và cả thực hiện tính toán. Giải pháp là tách ra thêm 2 lớp CartController và CartCalculator để chịu trách nhiệm quản lý giỏ hàng và tính toán chi phí
    - Order.java: lớp Order chịu cả trách nhiệm về tính toán chi phí đơn hàng và cả quản lí thông tin giao hàng. Giải pháp là tạo ra 2 lớp OrderCalculator phụ trách tính toán chi phí, và lớp DeliveryInformation để quản lí thông tin giao hàng.
    - Chi tiết:
      - ![image](https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/assets/105777915/29d9c6bf-2dcd-4caa-bdc0-69b195a7adc5)
      - ![image](https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/assets/105777915/fc4ff561-6e8c-4a78-9314-3e45a864c9b9)



</details>

<details>
<summary>Lê Văn Hùng</summary>
<br>

- Assigned tasks:
  - Tìm The Open Closed Principle

- Implementation details:
  - Pull Request(s): https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/12
  - Specific implementation details:
    - Tìm kiếm các class có nguyên lý Open Closed

</details>

<details>
<summary>Vi Lô Hùng</summary>
<br>

- Assigned tasks:
  - Kiểm tra vi phạm nguyên tắc thiết kế Liskov Substitution Principle

- Implementation details:
  - Pull Request(s): https://github.com/phamhoanggg/TKXDPM.KHMT.20231-10/pull/13
  - Specific implementation details: 
    - Tìm kiếm và kiểm tra các class có hoặc không vi phạm nguyên tắc thiết kế Liskov Substitution Principle

</details>

</details>

</details>
---
