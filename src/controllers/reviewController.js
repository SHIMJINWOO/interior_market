import reviewModel from "../models/Review.js";

    export const review = async (req, res) => {
        try{
            const reviews = await reviewModel.find({}).sort({createdAt:"descending"})
            return res.render('review', { pageTitle: 'review',reviews });
        } catch(error){
            return res.render('server-error')
        }
    };

    export const reviewCreate = (req, res) => {
        return res.render( 'reviewCreate');
    };

    export const reviewPost  = async (req,res) => {
        const {title,content,hashtags, rating} =  req.body;
        try{
            await reviewModel.create ({
                title,
                content,
                hashtags,
                createdAt: Date.now(),
                rating
            });
            return res.redirect('/review');
        } catch(error){
            console.log(' error !@!@'); 
            return res.render( 'reviewCreate');
        }
    };

    export const reviewRead = async (req,res) =>{
        const {id} = req.params;
        const review =  await reviewModel.findById(id);
        if (review){
            return res.render('reviewRead', { pageTitle: 'Read review',review });      
        } 
        return res.render('404',{pageTitle: 'not found  '})
    };

    export const reviewGetEdit =async (req,res) =>{
        const {id} = req.params;
        const review =  await reviewModel.findById(id);
        if (!review){
            return res.render('404',{pageTitle: 'not found  '})
        } 
        return res.render('reviewEdit', { pageTitle: 'Read Edit',review });
    };
      
    export const reviewPostEdit = async(req,res) =>{
        const {id} = req.params;
        const {title,content,hashtags,rating} = req.body;
        const review = await reviewModel.exists({_id:id});
        if (!review){
            return res.render('404',{pageTitle: 'not found  '})
        } 
            await reviewModel.findByIdAndUpdate(id,{
                title,content,hashtags,rating
            })
            return res.redirect(`/review`), { pageTitle: 'Read Edit',review };
    };

    export const reviewDelete = async(req,res) =>{
        const {id} = req.params;
        const review =  await reviewModel.findById(id);
        if (!review){
            return res.render('404',{pageTitle: 'not found  '})
        } 
        return res.render('reviewDelete', { pageTitle: 'Edit 삭제',review });
    };
    export const reviewDeleted = async(req,res) =>{
        const {id} = req.params;
        console.log(req.body)
        const {yes,no} = req.body;
        if (yes){
            await reviewModel.findByIdAndDelete(id);
            return res.redirect('/review');
        }
            return res.redirect(`/review/${id}`);
    };