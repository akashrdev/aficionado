import CabinIcon from '@mui/icons-material/Cabin';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserMenu = ({ open, setOpen }) => {
  const handlePost = () => {
    setOpen(true);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col mt-10 items-start space-y-4">
        <div className="flex flex-row space-x-2 mb-5">
          <img className="w-16" src="https://freesvg.org/img/tvforadoar.png" />
          <h1 className="text-white text-2xl flex mt-4">Aficionado</h1>
        </div>
        <div className="flex flex-row items-center space-x-2 font-bold text-xl">
          <div className="w-12">
            <CabinIcon style={{ fontSize: '40', color: 'white' }} />
          </div>
          <h1 className="text-white">Home</h1>
        </div>
        <div className="flex flex-row items-center space-x-2 font-bold text-xl">
          <div className="w-12">
            <NotificationImportantIcon
              style={{ fontSize: '40', color: 'white' }}
            />
          </div>
          <h1 className="text-white">Notifications</h1>
        </div>
        <div className="flex flex-row items-center space-x-2 font-bold text-xl">
          <div className="w-12">
            <AccountCircleIcon style={{ fontSize: '40', color: 'white' }} />
          </div>
          <h1 className="text-white">Profile</h1>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-24 rounded"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
