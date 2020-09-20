import axios from 'axios';
import { Observable } from 'rxjs';

class FileMetadataService {
  fetchAsync(files) {
    const data = new FormData();
    files.forEach(file => data.append('files', file));
    return new Observable(observer => {
      axios({
        method: 'POST',
        url: '/api/filemetadata',
        data
      }).then(({data}) => {
        observer.next(data);
        observer.complete();
      }).catch(err => {
        observer.error(err);
      });
    });
  }
}

export default new FileMetadataService();