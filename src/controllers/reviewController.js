import reviewModel from "../models/Review.js";
import userModel from "../models/User";

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
        const { user : {_id},}= req.session;
        const {title,content,hashtags, rating} =  req.body;
        const paths = req.files.map(file => file.path)
        try{
            const newReview = await reviewModel.create({
                title,
                content,
                hashtags,
                createdAt: Date.now(),
                rating,
                owner:_id,
                reviewPicUrl: paths,
            });
            const user = await userModel.findById(_id);
            user.reviews.push(newReview._id);
            user.save();
            return res.redirect('/review');
        } catch(error){
            console.log("errror:",error); 
            return res.render('reviewCreate');
        }
    };

    export const reviewRead = async (req,res) =>{
        const {id} = req.params;
        const review =  await reviewModel.findById(id).populate("owner");
        console.log(review.reviewPicUrl)
        if (review){
            return res.render('reviewRead', { pageTitle: 'Read review',review });      
        } 
        return res.render('404',{pageTitle: 'not found  '})
    };

    export const reviewGetEdit =async (req,res) =>{
        const {id} = req.params;
        const {
            user: { _id },
          } = req.session;
        const review =  await reviewModel.findById(id);
        if (!review){
            return res.render('404',{pageTitle: 'not found  '})
        } 
        if (String(review.owner) !== String(_id)) {
            return res.status(403).redirect("/");
          }
        return res.render('reviewEdit', { pageTitle: 'Read Edit',review });
    };
      
    export const reviewPostEdit = async(req,res) =>{
        const {
            user: { _id },
          } = req.session;
        const {id} = req.params;
        const {title,content,hashtags,rating} = req.body;
        const review = await reviewModel.findById(id);
        if (!review){
            return res.render('404',{pageTitle: 'not found  '})
        } 
        if (String(review.owner) !== String(_id)) {
            return res.status(403).redirect("/");
          }
            await reviewModel.findByIdAndUpdate(id,{
                title,content,hashtags,rating
            })
            return res.redirect(`/review`), { pageTitle: 'Read Edit',review };
    };

    export const reviewDelete = async(req,res) =>{
        const {id} = req.params;
        const {
            user: { _id },
          } = req.session;
        const review =  await reviewModel.findById(id);
        if (!review){
            return res.render('404',{pageTitle: 'not found  '})
        } 
        if (String(review.owner) !== String(_id)) {
            return res.status(403).redirect("/");
          }
        return res.render('reviewDelete', { pageTitle: 'Edit 삭제',review });
    };
    export const reviewDeleted = async(req,res) =>{
        const {id} = req.params;
        const {yes,no} = req.body;
        if (yes){
            await reviewModel.findByIdAndDelete(id);
            return res.redirect('/review');
        }
            return res.redirect(`/review/${id}`);
    };