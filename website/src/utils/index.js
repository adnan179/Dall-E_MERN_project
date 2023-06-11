import { surpriseMePrompts } from '../constants';
import FileSaver from 'file-saver';

export function getRandomPrompt(prompt){
  //generating a random index to access a random item from surprise me prompt
  const randomIndex = Math.floor(Math.random() * 
  surpriseMePrompts.length);

  //storing the random index value
  const randomPrompt = surpriseMePrompts[randomIndex];

  //checking if got the same prompt twice, if yes
  //calling the func again
  if(randomPrompt === prompt){
    return getRandomPrompt(prompt)
  }
  
  return randomPrompt;
}



export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}