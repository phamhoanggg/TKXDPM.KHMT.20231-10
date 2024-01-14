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


