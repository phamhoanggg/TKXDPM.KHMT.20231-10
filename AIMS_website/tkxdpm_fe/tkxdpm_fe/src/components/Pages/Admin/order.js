import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  Create,
  ImageField,
  SelectInput,
  NumberInput,
  BooleanInput,
  NumberField,
  BooleanField,
  ArrayField,
  SingleFieldList,
  ChipField,
  SimpleList,
  FunctionField,
  Button,
  useUpdate,
  useRefresh,
} from "react-admin";

import axios from "../../../setup/CustomAxios";
import { Fragment, useEffect, useState } from "react";

export const ListOrders = (props) => {
  const refresh = useRefresh();

  const [state, setState] = useState(true);

  const handleRefuseButton = async (id) => {
    await axios.patch(`/orders/${id}/canceled`);
    setState(!state);
    refresh();
  };

  return (
    <List {...props}>
      <Datagrid
        bulkActionButtons={false}
        rowStyle={(record) => ({
          backgroundColor: !record.isAccepted ? "#ffb3d1" : "",
        })}
      >
        <TextField label="id" source="id" />
        <TextField label="User ID" source="idOfUser" />
        <TextField label="Shipping Address" source="shippingAddress" />
        <ArrayField label="List Dish" source="products" textAlign="center">
          <Datagrid bulkActionButtons={false} header={() => false}>
            <TextField source="name" />
            <ImageField source="image" />
            <NumberField source="price" />
            <div>X</div>
            <NumberField source="quantity" />
          </Datagrid>
        </ArrayField>
        <TextField label="Payment Method" source="paymentMethod" />
        <NumberField label="Shipping Price" source="shippingPrice" />
        <NumberField label="Total Price" source="totalPrice" />
        <BooleanField label="Accepted" source="isAccepted" />
        <FunctionField
          label="Action"
          render={(record) =>
            record.isProcessed ? (
              "Đã được xử lý"
            ) : (
              <div>
                <Button
                  onClick={() => handleRefuseButton (record.id )}
                >
                  Refuse
                </Button>
              </div>
            )
          }
        ></FunctionField>
      </Datagrid>
    </List>
  );
};

export const EditDishes = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const data = await axios.get("categories");
    setCategories(data);
  }, []);

  return (
    <Edit {...props}>
      <SimpleForm className="">
        <TextInput source="name" className="" />
        <TextInput source="image" />
        <TextInput source="dishDescription" />
        <TextInput source="dishDetails" />
        <NumberInput source="price" />
        <NumberInput source="countInStock" />
        <BooleanInput source="isBestSeller" />
        <SelectInput
          source="idOfCategory"
          label="Category Name"
          choices={categories}
          optionText="catename"
          optionValue="id"
        ></SelectInput>
      </SimpleForm>
    </Edit>
  );
};

export const CreateDish = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const data = await axios.get("categories");
    setCategories(data);
  }, []);
  // const categories = [
  //     {
  //         "id": "0e97e4cf-efb5-49a3-8f62-1eadd72558b7",
  //         "catename": "ada",
  //         "image": "https://hoaianshop.com/wp-content/uploads/2021/02/hinh-anh-con-cho.jpg"
  //     },
  //     {
  //         "id": "178dfb82-6794-4910-a652-e4bce5dbda32",
  //         "catename": "adacxzxz",
  //         "image": "https://th.bing.com/th/id/R.bb686cb2a50a7b4002b6a5b557fe5c1c?rik=ZWgkjZb0OVlFjQ&pid=ImgRaw&r=0"
  //     },
  //     {
  //         "id": "3ce8bb9b-9728-4927-996d-49e6deb113ee",
  //         "catename": "món ý",
  //         "image": "https://th.bing.com/th/id/R.7aa43b384e5953db75e44c8936b65c07?rik=tdE5q1pLqbqNUA&pid=ImgRaw&r=0"
  //     }
  // ]

  return (
    <Create {...props}>
      <SimpleForm className="">
        <TextInput source="name" className="" />
        <TextInput source="image" />
        <TextInput source="dishDescription" />
        <TextInput source="dishDetails" />
        <NumberInput source="price" />
        <NumberInput source="countInStock" />
        <BooleanInput source="isBestSeller" />
        <SelectInput
          source="idOfCategory"
          label="Category Name"
          choices={categories}
          optionText="catename"
          optionValue="id"
        ></SelectInput>
      </SimpleForm>
    </Create>
  );
};
