import { Button } from './components/button'
import { PlusIcon } from './icons/plus';
import './App.css'
import { ShareIcon } from './icons/shareIcon';

export default function App() {
  return (
    <div className='flex p-3 gap-3'>
      <Button varient='primary' size='sm' text='share' startIcon={<ShareIcon size="sm" />} onClick={() => {
        alert("share button is clicked");
      }} />
      <Button varient='secondary' size='sm' text='add' startIcon={<PlusIcon size="sm" />} onClick={() => {
        alert("add button is clicked");
      }} />
    </div> 
  )
}