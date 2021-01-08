import './App.css';
import { Fragment, useState, Component } from "react";
import { Layout, Menu, Table } from 'antd';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const axios = require('axios');
const userTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password'
  },
  {
    title: 'Phones',
    dataIndex: 'phones',
    key: 'phones',
    render: user_phones => (
      <>
        {user_phones.map(user_phone => {
          return (
            <div>
              +{user_phone.countryCode} {user_phone.cityCode} {user_phone.number}
            </div>
          );
        })}
      </>
    ),
  }
];

class App extends Component {

  render() {

  return (
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1"><Link to="/">Inicio</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/users">Usuarios</Link></Menu.Item>
    </Menu>
    </Sider>
    <Layout className="site-layout">
        <div id="layout_content">
        <Switch>
            <Route path="/users">
                <Users />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
        </div>
    </Layout>
    </Layout>
    </Router>
  );
    }
}

function Home() {
  return <h1 id="home_h1">Bienvenido!</h1>;
}

function Users() {
    const [usuarios, setUsuarios] = useState([]);

    axios.get('http://localhost:8081/users')
  .then(function (response) {
    setUsuarios(response.data);
    console.log(usuarios);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  return (
      <Fragment>
      <h1>Usuarios</h1>
      <Table columns={userTableColumns} dataSource={usuarios}>
      </Table>
      </Fragment>
  );
}

export default App;
