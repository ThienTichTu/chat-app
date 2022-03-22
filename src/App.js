import './App.scss';
import Login from "./component/Login"
import ChatRoom from "./component/Chatroom"
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider'
import InviteMemberModal from "./component/Modal/InviteMemberModal"
import TestUpload from "./component/Uploadimg/TestUpload"
import PageNotFound from "./component/NotFoundPage/"
import UpdateUserModal from './component/Modal/UpdateUserModal';
import UpdateRoomModal from "./component/Modal/UpdateRoomModal"
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
function App() {
	return (

		<>

			<BrowserRouter>
				<AuthProvider>
					<AppProvider>
						<Routes>
							<Route element={<TestUpload />} path={'/upload'} />
							<Route element={<Login />} path="/login" />
							<Route element={<ChatRoom />} path="/" />
							<Route element={<PageNotFound />} path="*" />
						</Routes>
						<UpdateRoomModal />
						<UpdateUserModal />
						<InviteMemberModal />
					</AppProvider>
				</AuthProvider>

			</BrowserRouter>
		</>
	)


		;
}

export default App;
