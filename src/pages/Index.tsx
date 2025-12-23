import { IDE } from '@/components/ide/IDE';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Code Café - Browser IDE for Quick Code Snippets</title>
        <meta name="description" content="Code Café is a fast, browser-based IDE for creating and testing HTML, CSS, JavaScript, and React snippets. Auto-save, live preview, and export to zip." />
      </Helmet>
      <IDE />
    </>
  );
};

export default Index;
