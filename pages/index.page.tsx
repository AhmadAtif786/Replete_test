
import { MainLayout } from 'src/layouts/MainLayout';
import { AppAssets } from 'src/modules/appModules/Assests';


export default function App() {
 


  return (
    <>
<AppAssets/>
     
    </>
  );
}

App.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MainLayout>
      {page}
      
    </MainLayout>
  );
};


