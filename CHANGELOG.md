# Changelog

## 1.0.0 (2025-10-07)


### Features

* add configurable weeks for heatmap ([4369dd5](https://github.com/kouta0000/tlog/commit/4369dd5434e4aa7aa76fa5736d27d4b3ff484c94))
* add gaps for heatmap items ([f3f52a5](https://github.com/kouta0000/tlog/commit/f3f52a588d394b67f9bebe9194792525d4f6b50d))
* add policy page ([fc16600](https://github.com/kouta0000/tlog/commit/fc16600ea6f83028f77cbfc6e57787296ef27f21))
* add prologue and home logo to site configuration ([f98cdbf](https://github.com/kouta0000/tlog/commit/f98cdbfa3546356c5f7bd55ac683d7bfff31d953))
* add section configuration for feed items ([d1a15ca](https://github.com/kouta0000/tlog/commit/d1a15ca3e424315c76046e8c684f6139a9b77851))
* add sensitive content handling ([27eb74d](https://github.com/kouta0000/tlog/commit/27eb74d9833ec7c30d0545196ae538b084927b8b))
* add total word count in footer ([9b3ca20](https://github.com/kouta0000/tlog/commit/9b3ca20436222cd80aed49f1d7fb83e06718be7d))
* **comment:** add sorting and reload functionality ([b1078d7](https://github.com/kouta0000/tlog/commit/b1078d74b56a416b4bedaa85571d3618a58d45bb))
* **comment:** support soft‑line‑breaks ([b07be59](https://github.com/kouta0000/tlog/commit/b07be591993f14f67bbb4e664dbc65a51c9d4be7))
* enhance comment to support unauthenticated users ([3e68d90](https://github.com/kouta0000/tlog/commit/3e68d90c85a1c22e148b0600f632d8d3fee8fe9b))
* enhance JWT token verification with renewal ([baf4758](https://github.com/kouta0000/tlog/commit/baf47584b1d98442b8fd59aba0d0f479c5c4d79e))
* **feed:** add configurable feed item limit ([cfa3f47](https://github.com/kouta0000/tlog/commit/cfa3f4764d7cdd895ab3df7cff3b03b5e92f2b68))
* **feed:** add feed styles ([cfa3f47](https://github.com/kouta0000/tlog/commit/cfa3f4764d7cdd895ab3df7cff3b03b5e92f2b68))
* **feed:** remove RSS and JSON feeds ([cfa3f47](https://github.com/kouta0000/tlog/commit/cfa3f4764d7cdd895ab3df7cff3b03b5e92f2b68))
* identify feed locale via params and add sensitive content support to feed links ([8aff229](https://github.com/kouta0000/tlog/commit/8aff22947eb860fa5f27d81d6eb8d1203c816629))
* init ([feeec6d](https://github.com/kouta0000/tlog/commit/feeec6d20b78b84da507aac62b38e76d73c08c4c))
* **jotting:** add content word count ([5feda34](https://github.com/kouta0000/tlog/commit/5feda345bafcf659250033a68e2d6b532085d0f5))
* **jotting:** add top priority field ([df8c3dd](https://github.com/kouta0000/tlog/commit/df8c3ddad6d839d52705bfcf2e559f3a9bf200d9))
* **jotting:** integrate comments section in jottings ([d54101f](https://github.com/kouta0000/tlog/commit/d54101f889aba163f777560e7527945abc22f6fe))
* **note:** add reading time prediction ([e0cafe5](https://github.com/kouta0000/tlog/commit/e0cafe50c8c499d5915495c6dd3e7053ca148260))
* **note:** add top priority field ([51b5b3e](https://github.com/kouta0000/tlog/commit/51b5b3e52550987d6f92cb5acfd437b013da34f1))
* replace SSR with CSR for list filtering ([3d374c8](https://github.com/kouta0000/tlog/commit/3d374c89617a98caf609fe5d11a86b231925d8be))
* staticize error pages ([778bd9e](https://github.com/kouta0000/tlog/commit/778bd9e194d7afb58bb6db212a4e07f80e8481f3))


### Bug Fixes

* add aria-labels to positioning buttons ([e03dc13](https://github.com/kouta0000/tlog/commit/e03dc13987fd4fa68d50c0328e49ff3f79345311))
* add benefits description for OAuth ([78fe7e7](https://github.com/kouta0000/tlog/commit/78fe7e78b8f0c7f113f7a102945de2599e3ccde5))
* add cursive font for CJK ([ca60790](https://github.com/kouta0000/tlog/commit/ca60790578b573c7e14cdd6f398463493cf3cd48))
* add language-specific font support ([9918b9a](https://github.com/kouta0000/tlog/commit/9918b9abf8de260e1ed78a4919e81314e79261e7))
* add missing paginator styles ([249d39b](https://github.com/kouta0000/tlog/commit/249d39b0fadedd7f56fcd9ddb0cef191cc201b27))
* add transition for sensitive contents ([334a55e](https://github.com/kouta0000/tlog/commit/334a55e3447c6a9cdfd8c9cbdf2e921cb5226591))
* avoid overflow of navigator menu ([6d1fc79](https://github.com/kouta0000/tlog/commit/6d1fc7958652fd76b08a5db4abcafe0243d50bd2))
* check if policy file exists and render footer conditionally ([5fb894d](https://github.com/kouta0000/tlog/commit/5fb894d5baab03474bbf3af7b18ee5d605b1a5f4))
* **comment:** add animation ([3112afb](https://github.com/kouta0000/tlog/commit/3112afbf09db5ad0b85b2354594dcb1e8bd24aa1))
* **comment:** add title to markdown preview icon ([e74f58b](https://github.com/kouta0000/tlog/commit/e74f58bbc61810a04e68d4edb09017d22d1faea1))
* **comment:** adjust emoji layout for better responsiveness ([7ac262e](https://github.com/kouta0000/tlog/commit/7ac262ee491231545ae8b8f150b07b1a40d2bea7))
* **comment:** check drifter by  drifter.ID ([5621912](https://github.com/kouta0000/tlog/commit/56219128c5038b2bf7d2776228530ff86d99e3c8))
* **comment:** enhance preview section with empty state message ([c103df3](https://github.com/kouta0000/tlog/commit/c103df33c4d710fae84eb746ff03a6f08f894cde))
* **comment:** inline loading icons ([eabb0db](https://github.com/kouta0000/tlog/commit/eabb0dbeab134859b853990db7c5ef4df2dc340b))
* **comment:** integrate Turnstile site key into component ([65e7826](https://github.com/kouta0000/tlog/commit/65e7826759b38be825a72a6e7fe5770d5768191a))
* **comment:** update  mobile layout indentation ([219bf95](https://github.com/kouta0000/tlog/commit/219bf95af40927b0cfff88e6bcba7b930a54423a))
* **comment:** update alt text ([f79e6e6](https://github.com/kouta0000/tlog/commit/f79e6e6c2123c038b4801a5100cc47b8dbdc27c7))
* **comment:** update tip type on successful share ([52e677b](https://github.com/kouta0000/tlog/commit/52e677ba2c0db94ac1fbcd35528e59d1312b59b4))
* **config:** add imageService option to cloudflare adapter ([71a7fc8](https://github.com/kouta0000/tlog/commit/71a7fc807a5941b6338e606f29e141b7dd0c7815))
* consolidate font links ([a70a3fd](https://github.com/kouta0000/tlog/commit/a70a3fdb5916521e4c454dc7788a377807302a77))
* correct SPA loading issue on policy page ([14ab7ea](https://github.com/kouta0000/tlog/commit/14ab7ea82da36c8b9f3994e2b57d102df32c15d8))
* display user timezone for comments ([6d0cea2](https://github.com/kouta0000/tlog/commit/6d0cea280a25f0e28822f1609017201d69b1a74e))
* **drifter:** handle null name in user profile query ([2b13631](https://github.com/kouta0000/tlog/commit/2b13631176baaac3038f081f4c7e8325fc9a0ae3))
* **drifter:** return profile data directly ([5919fe8](https://github.com/kouta0000/tlog/commit/5919fe89a3c5c580566fe1bd29c0005ba4321b38))
* enhance CJK support for remark ([5dd5168](https://github.com/kouta0000/tlog/commit/5dd5168dfb85523657e7e676d1eb0b2b536fdcb1))
* **feed:** add description to items ([432cc99](https://github.com/kouta0000/tlog/commit/432cc990ae8716f2d7269dfa1db151ee90b5b387))
* **feed:** change link from `/feed` to `/feed.xml` ([b90b6e3](https://github.com/kouta0000/tlog/commit/b90b6e3adfc3c5e5448f6cea64e5a627eda36468))
* **feed:** update feed URL in XSLT ([46c3c13](https://github.com/kouta0000/tlog/commit/46c3c130f440d7fb6b40c97de0b61f1d058a5c45))
* **footer:** add title for policy link ([3e3c697](https://github.com/kouta0000/tlog/commit/3e3c697c25cfe7f69bd86cb337c1e5866c38345f))
* **footer:** add title for theme link ([bb21725](https://github.com/kouta0000/tlog/commit/bb21725b82573d46b1aa4f9ea9190601673373cd))
* **footer:** update icon imports and vertically center icons ([8ba882a](https://github.com/kouta0000/tlog/commit/8ba882a5ad5048f7ad8571f92cef524ead37ab57))
* **footer:** update layout and add link of theme ([03f5612](https://github.com/kouta0000/tlog/commit/03f5612aea4bdd24d49ec279777f8d467a8f902f))
* handle rendering fallback for information ([cb7543b](https://github.com/kouta0000/tlog/commit/cb7543bbb245c6860f62e97c7c78e0372767d8a9))
* **heatmap:** tooltip overflow ([deef172](https://github.com/kouta0000/tlog/commit/deef172ae9f18f628ff6fefb1af7d4691edd72b0))
* **home:** adjust layout and visibility ([627fe36](https://github.com/kouta0000/tlog/commit/627fe3691304a1ac45e0cbd66f1f9b70638ba5cb))
* **i18n:** update navigation keys ([f083da4](https://github.com/kouta0000/tlog/commit/f083da49c7ab458bfad16636de58aa4b03ec5ee5))
* **icon:** add z-index to tooltip ([0ff02d8](https://github.com/kouta0000/tlog/commit/0ff02d8715e202227ff671c68a998cb07bfb5d08))
* **icon:** adjust z-index for tooltip ([cf8f21f](https://github.com/kouta0000/tlog/commit/cf8f21fe8622b1a848f9aeb476671eaf8c5fd870))
* **information:** correct typo ([6618275](https://github.com/kouta0000/tlog/commit/661827529ac7bc0618cbc8c1c89bd2ef4452b56d))
* **jotting, note:** extract only necessary properties ([c08f2ed](https://github.com/kouta0000/tlog/commit/c08f2ed8efa47eef6f6689adb7800530698f383b))
* **jotting:** adjust layout ([2cfe126](https://github.com/kouta0000/tlog/commit/2cfe1261e9b57df3b95712904b2d4318f4f2b740))
* **jotting:** adjust layout ([69d39d6](https://github.com/kouta0000/tlog/commit/69d39d649886d46af2b439ba273b0a2b74a4f8c9))
* **jotting:** hide tag icon when no tags ([3ad8bb4](https://github.com/kouta0000/tlog/commit/3ad8bb4c9bd026fd6a7a448195d519adac6cf91a))
* **jotting:** progress circle not working ([96c1951](https://github.com/kouta0000/tlog/commit/96c1951be9f50e9f5aa06ab2cbb757df82d0336a))
* **layout:** add z-index for preventing overlap ([53979ef](https://github.com/kouta0000/tlog/commit/53979ef8e83e0d6de4688c1af87624034c24a5e0))
* **layout:** adjust flex layout for *about* page ([d5c61b9](https://github.com/kouta0000/tlog/commit/d5c61b96f32eadb0fecc6b593749529aeefc5468))
* **layout:** adjust margin for footer ([d20eb78](https://github.com/kouta0000/tlog/commit/d20eb780cd653e429cfddc27741aac58994e2793))
* **layout:** adjust position of Position component ([aea35d2](https://github.com/kouta0000/tlog/commit/aea35d290b7fcf6d4dee6a05f9e9925633cf6a9e))
* **layout:** horizontally center feed icon ([568b0d5](https://github.com/kouta0000/tlog/commit/568b0d50dfecc52ffdef22ef13ce5308f4477d4b))
* **layout:** prevent overflow of absolute elements ([ef2cea8](https://github.com/kouta0000/tlog/commit/ef2cea81e736c936e8fd877755a095781d5f3cf5))
* **layout:** remove unnecessary height from sensitive warning ([4c02e5c](https://github.com/kouta0000/tlog/commit/4c02e5cff25b8b1ddce61a18422c55b84be42b1d))
* **layout:** remove unnecessary margin ([c9b0edf](https://github.com/kouta0000/tlog/commit/c9b0edffea9383dc0e045820724388387ad8e991))
* **layout:** swap positions of feed button and theme toggle button ([c675d17](https://github.com/kouta0000/tlog/commit/c675d174f011c3f72037905820b76dafee253747))
* **markdown:** change mark style to wavy ([0df0c18](https://github.com/kouta0000/tlog/commit/0df0c18b59eb05dbaba45473c5c2ffd60589c790))
* **markdown:** only hide anchor link in title ([5db7cab](https://github.com/kouta0000/tlog/commit/5db7cab782247cb6549a47a4523854568176cde8))
* move word count to Markdown rendering stage ([fcd1f99](https://github.com/kouta0000/tlog/commit/fcd1f99c21d60455789637ab2f8d99eaa291d2b9))
* **note:** remove reading time estimation ([871cac9](https://github.com/kouta0000/tlog/commit/871cac9152d869f12162714483f358b83107944f))
* notification deletion ([12d1fa6](https://github.com/kouta0000/tlog/commit/12d1fa66bc6794d240a419e1f321b737c096475b))
* **oauth:** set expiration for escort to 5 minutes ([3076739](https://github.com/kouta0000/tlog/commit/3076739c3fbfa5674a83d902dd5f19706a36b147))
* prevent warning from notification type ([7d13746](https://github.com/kouta0000/tlog/commit/7d137462b2e794a35c7f7e8ca84cb6242d4a584e))
* progress ring closes too early ([2ba1291](https://github.com/kouta0000/tlog/commit/2ba1291ed0dc341eee3aa5277d296de4d9dc0afa))
* remove claim section and related content from about page ([656420f](https://github.com/kouta0000/tlog/commit/656420f1ff81f1323bea534731cf1f038fc46cfe))
* set home icon as inline ([981be9b](https://github.com/kouta0000/tlog/commit/981be9b16ede6a95e46259fa21fe944e6f5cef88))
* set initial values for list rendering ([6300997](https://github.com/kouta0000/tlog/commit/630099735ec515347916d050b6424086dafd738c))
* shorten class name of unocss ([d4bccc0](https://github.com/kouta0000/tlog/commit/d4bccc023a37c16c1c8ff3b50ec3ccb921bd8766))
* **style:** add hover effect for items in jotting and note list ([e2fbc48](https://github.com/kouta0000/tlog/commit/e2fbc48dc4f701fda0811871aab737018c309a6b))
* **style:** add underline animation on hovered link ([0d733ac](https://github.com/kouta0000/tlog/commit/0d733ac4472676927da63497168a9bd2034a6a9e))
* **style:** adjust navigator layout ([543b2d6](https://github.com/kouta0000/tlog/commit/543b2d681df2ede5df5b15b5649ba54581dd333c))
* **style:** avoid using `contain-layout` ([9161b47](https://github.com/kouta0000/tlog/commit/9161b47e5ce9f8d7746d2d40a1fd5073feec7d02))
* **style:** correct font-size for code title ([5b45677](https://github.com/kouta0000/tlog/commit/5b456779144a25e5250c84a0079ab7ab4af9f734))
* **style:** enhance icon title transition effects ([1fdca4e](https://github.com/kouta0000/tlog/commit/1fdca4ec312f92e4b514aa1c162dc8b75dbdc5bb))
* **style:** force render icon ([436cc5b](https://github.com/kouta0000/tlog/commit/436cc5b669486c554c48627c52679d3fc35531f1))
* **style:** github alert svg lost colors ([671f45f](https://github.com/kouta0000/tlog/commit/671f45f089571821e151b5bc40ddaf9c851eb444))
* **style:** increase z-index for medium-zoom overlay ([511860f](https://github.com/kouta0000/tlog/commit/511860fa40fe91afb9b14cc5cba396dfa7d84e0f))
* **style:** make hover effect responsively ([8f334d0](https://github.com/kouta0000/tlog/commit/8f334d03bd19c1473824ec22b66ac61085633387))
* **style:** overflow in katex block ([ae3496e](https://github.com/kouta0000/tlog/commit/ae3496e4633fe3277395ced805faf6af85a0ac70))
* **style:** reset hr style ([f19907f](https://github.com/kouta0000/tlog/commit/f19907fd0e2daceab43c21d55330923b06ca6b7b))
* **style:** set figure display to inline-block ([f89b2f4](https://github.com/kouta0000/tlog/commit/f89b2f447d744c41c2ee02173faf2269231dcd7c))
* **styles:** update colors for github alerts ([4c2716f](https://github.com/kouta0000/tlog/commit/4c2716f9c6a651638e0eff8de859a5435f8956b5))
* **style:** update color for highlight of IMPORTANT alert ([2a26902](https://github.com/kouta0000/tlog/commit/2a26902843f2327ec7e4866e90481868345eb5e9))
* **style:** use icon for comment timer ([886392b](https://github.com/kouta0000/tlog/commit/886392bc19696849f9e1a266df57ea0ad72a3ea4))
* **style:** use icons for remaining items in Reply component ([03eda5a](https://github.com/kouta0000/tlog/commit/03eda5a164e2ff6f6f044b382215ed3a4067a01a))
* theme transition flicker ([a1c43bd](https://github.com/kouta0000/tlog/commit/a1c43bd5424ae10c9410b5df825bbc9a3bcf937b))
* **theme:** switch to github-light theme in shiki ([80b75c1](https://github.com/kouta0000/tlog/commit/80b75c1439cf8b440077c5a6acdc9dc078b234a9))
* **tip:** horizontally center icon ([82d028f](https://github.com/kouta0000/tlog/commit/82d028ffea0ad3a3cd883960d44ba61e3333e080))
* update default logo and prologue ([75588ed](https://github.com/kouta0000/tlog/commit/75588ed6ec7ebeeca65682a967a9729175e9b5e7))
* update icon for tag and series ([4994e7c](https://github.com/kouta0000/tlog/commit/4994e7cb86b6856defe9bdb12e389a3d660bb4e4))

## [0.17.1](https://github.com/tuyuritio/astro-theme-thought-lite/compare/v0.17.0...v0.17.1) (2025-10-06)


### Bug Fixes

* add missing paginator styles ([249d39b](https://github.com/tuyuritio/astro-theme-thought-lite/commit/249d39b0fadedd7f56fcd9ddb0cef191cc201b27))
* set initial values for list rendering ([6300997](https://github.com/tuyuritio/astro-theme-thought-lite/commit/630099735ec515347916d050b6424086dafd738c))
* **style:** make hover effect responsively ([8f334d0](https://github.com/tuyuritio/astro-theme-thought-lite/commit/8f334d03bd19c1473824ec22b66ac61085633387))

## [0.17.0](https://github.com/tuyuritio/astro-theme-thought-lite/compare/v0.16.0...v0.17.0) (2025-10-05)


### Features

* add total word count in footer ([9b3ca20](https://github.com/tuyuritio/astro-theme-thought-lite/commit/9b3ca20436222cd80aed49f1d7fb83e06718be7d))


### Bug Fixes

* **style:** add hover effect for items in jotting and note list ([e2fbc48](https://github.com/tuyuritio/astro-theme-thought-lite/commit/e2fbc48dc4f701fda0811871aab737018c309a6b))

## [0.16.0](https://github.com/tuyuritio/astro-theme-thought-lite/compare/v0.15.7...v0.16.0) (2025-10-04)


### Features

* replace SSR with CSR for list filtering ([3d374c8](https://github.com/tuyuritio/astro-theme-thought-lite/commit/3d374c89617a98caf609fe5d11a86b231925d8be))
* staticize error pages ([778bd9e](https://github.com/tuyuritio/astro-theme-thought-lite/commit/778bd9e194d7afb58bb6db212a4e07f80e8481f3))

## [0.15.7](https://github.com/tuyuritio/astro-theme-thought-lite/compare/v0.15.6...v0.15.7) (2025-10-02)


### Bug Fixes

* **style:** avoid using `contain-layout` ([9161b47](https://github.com/tuyuritio/astro-theme-thought-lite/commit/9161b47e5ce9f8d7746d2d40a1fd5073feec7d02))
* **style:** update color for highlight of IMPORTANT alert ([2a26902](https://github.com/tuyuritio/astro-theme-thought-lite/commit/2a26902843f2327ec7e4866e90481868345eb5e9))

## [0.15.6](https://github.com/tuyuritio/astro-theme-thought-lite/compare/v0.15.5...v0.15.6) (2025-09-29)


### Bug Fixes

* update default logo and prologue ([75588ed](https://github.com/tuyuritio/astro-theme-thought-lite/commit/75588ed6ec7ebeeca65682a967a9729175e9b5e7))

## [0.15.5](https://github.com/tuyuritio/astro-theme-thought-lite/compare/v0.15.4...v0.15.5) (2025-09-28)


### Bug Fixes

* correct SPA loading issue on policy page ([14ab7ea](https://github.com/tuyuritio/astro-theme-thought-lite/commit/14ab7ea82da36c8b9f3994e2b57d102df32c15d8))
