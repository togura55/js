���C���N�pWILL 3.0 SDK-Web�f��

�����_�����O�ƃ��j�o�[�T���C���N���f���̃T���v���B

������

�T���v���A�v���P�[�V�����́AJavaScript�������g�p����WILL SDK for ink�iv3.0�j�̎g�p�ɂ��C���N�����_�����O�������Ă��܂��B
����ɁA���j�o�[�T���C���N���f�����g�p�����C���N�f�[�^�̏������ǂ̂悤�Ɏ�������邩�������܂��B

WILL�����_�����O�́A���܂��܂Ȏ�ނ̃����_�����O��@��񋟂��܂��G�x�N�g������у��X�^�[�����_�����O�B
�x�N�^�[�����_�����O�́A�p�X�̃X�g���[�N���E�𖳒n*�i�}1.1���Q�Ɓj*�œh��Ԃ���@�ł��B

�I[�x�N�^�[Web�����_�����O�B]�i./ media / 01_vector_sample.png�j
*�}1.1�F�x�N�^�[Web�����_�����O�̃X�N���[���V���b�g*

�}1.2�́A�T���v�����񋟂���@�\�̊ȒP�Ȑ����ł��B

�I[�x�N�^�[Web�����_�����O�B]�i./ media / 01_vector.png�j
*�}1.2�F�x�N�^�[Web�����_�����O�̃X�N���[���V���b�g*

���X�^�[�����_�����O�́A�d�Ȃ荇���p�[�e�B�N�����g�p���ăX�g���[�N�������_�����O�����@�ł��i*�}2.1���Q�Ɓj*�B
���̎�@�ɂ��A���\���͖L���ȃc�[���i�N�������A���M�A���ʃu���V�Ȃǁj���\�z�ł��܂��B

�I[���X�^�[Web�����_�����O�B]�i./ media / 02_raster_sample.png�j
*�}2.1�F���X�^�[Web�����_�����O�̃X�N���[���V���b�g*

�}2.2�́A�T���v�����񋟂���@�\�̊ȒP�Ȑ����ł��B

�I[���X�^�[Web�����_�����O�B]�i./ media / 02_raster.png�j
*�}2.2�F���X�^�[�����_�����O�̋@�\�̊T�v*

�}3�́A���X�^�[�ƃx�N�^�[�����_�����O��g�ݍ��킹���L�����o�X�������Ă��܂��B

�I[�L�����o�X�������_�����O���鍬���e�N�j�b�N]�i./ media / 03_mixed.png�j
*�}3�F���������_�����O�Z�p��񋟂���Canvas *


���u���V�c�[��

##�u���V�c�[���̃C���|�[�g
[�C���N�f�U�C�i�[]�ihttp://ink-designer.trafficmanager.net/�j�́A�u���V�c�[���̃p�����[�^�[�Ɗ֘A����p�C�v���C���\�����ȒP�ɍ\��������@��񋟂��܂��B[�h�L�������g]�ihttps�F// will3- docs-eu.azurewebsites.net/docs/ink-designer�j�B

�G�N�X�|�[�g�@�\���g�p���āA�T���v���A�v���P�[�V�������Ńc�[�����_�E�����[�h���ăC���|�[�g�ł��܂��B

�I[�C���N�f�U�C�i�[]�i./ media / 05_ink-designer.png�j
*�}5�F�C���N�f�U�C�i�[���Ő݌v���ꂽ�x�N�^�[�u���V�c�[��*

����ŁA�K�؂ȃL�����o�X�̃C���|�[�g�@�\���g�p���āA�c�[�����C���|�[�g�ł��܂��B

##�v���O�����Ńu���V�c�[�����쐬����
���̃X�j�y�b�g�́A�ȒP�ȉ��M�u���V���`������@�������Ă��܂��B

`` `javascript
���M�F�V����ParticleBrush�i0.15�A0.15�A
ParticleBrush.RotationMode.RANDOM�A
"/images/textures/essential_shape.png"�A
"/images/textures/essential_fill_11.png"�A
true�j�A
�u�v
�p�����[�^�ɂ��ẮA[�h�L�������g]�idocs / Rasterization.WebGL.ParticleBrush.html�j�Ő�������Ă��܂��B


���C���N�����_�����O

�C���N�W�I���g���p�C�v���C���́A�|�C���^�[���̓f�[�^���C���N�W�I���g���ɕϊ����܂��B
�T���v���A�v���P�[�V�����ł́A�W�I���g���p�C�v���C�����쐬����A `InkCanvas`�N���X�Őݒ肳��܂��B
`InkCanvasVector`�́A�x�N�^�[2D�����_�����O�̃p�C�v���C�����g�����܂��B
`InkCanvasRaster`�̓��X�^�[�i�p�[�e�B�N���jWebGL�����_�����O�ɓ������Ă��܂��B

�p�C�v���C�����g�p����ɂ́A�C���N�p�X�̃R���e���c���w�肷��f�[�^���C�A�E�g���쐬����K�v������܂��B
�ȉ��́A�p�X�|�C���g��X�AY���W�A�σT�C�Y�̊�{�I�ȁu���C�A�E�g�v�ł��F

`` `javascript
    var layout = [
        PathPoint.Property.X�A
        PathPoint.Property.Y�A
        PathPoint.Property.SIZE
    ];
�u�v

�T���v���A�v���P�[�V�����́A�v���p�e�B�i��]�A�X�P�[���A�I�t�Z�b�g�Ȃǁj��ǉ����܂��B
* Config.js *�́A���܂��܂ȓ��̓f�o�C�X�ɓK�����������̈قȂ�T���v���ݒ��񋟂��܂��B

## PathPoint Calculator

`calculator`��` InkBuilder`�ɓn�����\�b�h�ł��B
�|�C���^�[�C�x���g����̃f�[�^���p�X�|�C���g�ɕϊ�������@���`���܂��B
�T���v���A�v���P�[�V�����́A�|�C���^�[���́i�y���A�}�E�X�A�܂��̓^�b�`�j�Ɉˑ�����p�X�|�C���g�v�Z���\�b�h�̂������̗��񋟂��A�C���N�r���_�[�ɓK�؂ȃf�[�^��񋟂��܂��B
������* Config.js *�X�N���v�g�ɂ���܂��B

##�C���N�̍\�z

�C���N�����A���^�C���ō쐬����ɂ́A�|�C���^�[���̓C�x���g�|�C���^�[�_�E���A�|�C���^�[���[�u�A�|�C���^�[�A�b�v���������A `InkBuilder`�ɓ��͂�񋟂���K�v������܂��B
* On Begin *�t�F�[�Y�́ApointerType�ɑΉ�����悤�ɑI������Ă��܂��B
`drawPath`�͂��ׂẴt���[���ŃL�����o�X���X�V���܂��B
`InkBuilder`����񋟂����` pathPart`�ɂ́A�ǉ�����ї\���i�܂��͗\���j�f�[�^��2�̃R���N�V�������܂܂�Ă��܂��B
�ǉ����ꂽ�f�[�^�̓X�g���[�N�̉i���I�ȕ����ɂȂ�܂����A�\�����ꂽ�f�[�^�͈ꎞ�I�Ȃ��̂ł���A���݂̃t���[���ɂ̂ݕ\������܂��B

`BrushPalette`�͂������̃u���V���`���܂��B
`InkBuilder`�̓����_�����O�Ɏg�p����u���V��m��K�v������܂��B
�x�N�^�[�C���L���O�ɂ́A�u���V�̌`����`���邽�߂Ɏg�p����� `PolygonBrush`���K�v�ł��B
���X�^�[�C���L���O�ɂ́A `ParticleBrush`��` spacing`�v���p�e�B���K�v�ł��B
`spacing`�p�����[�^�́A�p�X�̋O���ɉ������قȂ�p�[�e�B�N���Ԃ̋������w�肵�܂��B

##�����_�����O�C���N

�C���N�W�I���g�����쐬�����ƁA `StrokeRenderer`���g�p���ĕ\���ł��܂��B
�R���X�g���N�^�ō\������K�v������܂��B
���l�̃C���^�[�t�F�[�X��񋟂���2�̃N���X-`StrokeRenderer2D`��` StrokeRendererGL`������܂��B
����͕`��ʂƂ��Ďg�p�����p�����[�^ `canvas`�����܂��B
�T���v���A�v���P�[�V�����͌����I�ȃ����_�����O�������Ă��܂�