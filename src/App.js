import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import AddImportantInfo from './screens/Addimportantinfo';
import EditImportantInfo from './screens/EditImportantinfo';
import AddManager from './screens/AddManager';
import AddProgram from './screens/AddProgram';
import LogIn from './screens/Login';
import ImportantInfo from './screens/ViewImportantInfo';
import AdminMap from './screens/mapedit';
import ViewAnnouncements from './screens/ViewAnnouncement'
import EditAnnouncement from './screens/EditAnnouncement'
import AddAnnouncement from './screens/AddAnnouncement'
import { AuthContextProvider } from './context/AuthContext';
import UserList from './screens/UserList';

class App extends React.Component {
  render() {
    return (
      <div className="body">
        <AuthContextProvider>
          <Navbar />


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viewimportantinfo" element={<ImportantInfo />} />
            <Route path="/addimportantinfo" element={<AddImportantInfo />} />
            <Route path="/addprogram" element={<AddProgram />} />
               <Route path="/viewannouncements" element={<ViewAnnouncements/>}/>
              <Route path="/editannouncement/:announcementid" element={<EditAnnouncement/>}/>
              <Route path="/addannouncement" element={<AddAnnouncement/>}/>
            {/* Include the following lines only if you decide to keep the EditProgram functionality */}
            {/* <Route path="/editprogram" element={<EditProgram />} /> */}
            {/* <Route path="/editprogram/:eventid" element={<EditProgram />} /> */}
            <Route path="/editimportantinfo" element={<EditImportantInfo />} />
            <Route path="/editimportantinfo/:infoid" element={<EditImportantInfo />} />
            <Route path="/addmanager" element={<AddManager />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/mapediting" element={<AdminMap />} />
            <Route path="/userlist" element={<UserList />} />
          </Routes>
        </AuthContextProvider>

      </div>
    );
  }
}

export default App;
