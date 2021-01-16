import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  NumberInput,
  NumberField,
  required,
  DateField,
  DateInput,
} from "react-admin";
export const ClientList = (props) => (
  <List {...props} pagination={null}>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="name" />
      <TextField source="surname" />
      <TextField source="patronymic" />
      <DateField source="birthDate" />
      <NumberField source="balance" />
      <EditButton basePath="/clients" />
    </Datagrid>
  </List>
);

const ClientTitle = ({ record }) => {
  return (
    <span>Client {record ? `"${record.name} ${record.surname}"` : ""}</span>
  );
};

export const ClientEdit = (props) => (
  <Edit title={<ClientTitle />} {...props}>
    <SimpleForm>
      <NumberInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="surname" />
      <TextInput source="patronymic" />
      <DateInput source="birthDate" />
      <NumberInput validate={required()} source="balance" />
    </SimpleForm>
  </Edit>
);

export const ClientCreate = (props) => (
  <Create title="Create a Client" {...props}>
    <SimpleForm>
      <NumberInput validate={required()} source="id" />
      <TextInput source="name" />
      <TextInput source="surname" />
      <TextInput source="patronymic" />
      <DateInput source="birthDate" />
      <NumberInput validate={required()} source="balance" />
    </SimpleForm>
  </Create>
);
