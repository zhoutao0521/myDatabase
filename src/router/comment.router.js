const Router = require('koa-router');

// self
const {
	verifyAuth,
	verifyPermission,
} = require('../middleware/auth.middleware');

const {
	create,
	reply,
	update,
	remove,
} = require('../controller/comment.controller');
const router = new Router({ prefix: '/comment' });

// 创建评论(动态)
router.post('/', verifyAuth, create);

// 回复评论(评论)
router.post('/:commentId/reply', verifyAuth, reply);

// 更新评论
router.patch('/:id', verifyAuth, verifyPermission('comment'), update);

// 删除评论
router.delete('/:id', verifyAuth, verifyPermission('comment'), remove);

// 获取某动态的评论条数
// router.get('/',)
module.exports = router;
