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
  BulkDeleteWithConfirmButton,
  FunctionField
} from 'react-admin'
import { Button } from 'react-admin'
import axios from '../../../setup/CustomAxios';
import { useRefresh } from 'react-admin';


export const ListCategories = (props) => {

 
  const refresh = useRefresh ();

  const handleDeleteButton =async (id) => {
    await axios.put(`/categories/${id}/del`)
    refresh();
  }
  return (
    <List {...props}  >
      <Datagrid bulkActionButtons={false}>
        <TextField source='id' />
        <TextField source='cateName' />
        <ImageField source='image' />
        <TextField source='isDeleted' />
        <EditButton basePath='/products' />
        <FunctionField render={record => (
          <Button style={{ color: "red" }} onClick={() => handleDeleteButton(record.id)}>DELETE</Button>
        )} />
  
      </Datagrid>
    </List>
  )
}

export const EditCategory = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source='cateName' />
      <TextInput source='image' />
    </SimpleForm>
  </Edit>
)

export const CreateCategory = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='cateName' />
      <TextInput source='image' />
    </SimpleForm>
  </Create>
)