import { server } from './web';
import { PORT } from './config';

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
