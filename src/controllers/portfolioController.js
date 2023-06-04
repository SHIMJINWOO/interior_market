export const portfolio = (req, res) => {
  res.render('portfolio', { pageTitle: 'PortFolio', siteName: 'Welcome to Interio Market Portfolio' });
  };

export const portfolioRead =(req,res) =>{
  res.send(`${req.params.id} of it`)
}
export const portfolioCreate =(req,res) =>{
  res.send(`${':/id'} of it`)
}
export const portfolioDelete =(req,res) =>{
  res.send(`${':/id'} of it`)
}
