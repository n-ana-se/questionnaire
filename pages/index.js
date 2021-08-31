import { useForm, Controller } from "react-hook-form"
import Container from "@material-ui/core/Container"
import Input from "@material-ui/core/Input"
import firebase from "./config/firebase"

export default function Home() {
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm()
  const onSubmit = (data) => {
    console.log(data)
    watch("isLearning") === 'true' || watch("wasLearning") === 'true' ?
    firebase.firestore().collection('questionnaires')
      .add({
        name: data.name,
        birth: data.birth,
        isLearning: data.isLearning,
        wasLearning: data.wasLearning,
        language: data.language
      }) :
    firebase.firestore().collection('questionnaires')
      .add({
        name: data.name,
        birth: data.birth,
        isLearning: data.isLearning,
        wasLearning: data.wasLearning,
      })
  }

  return (
    <>
      <Container>
        <h1>プログラミング学習に関するアンケート</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* useFormで準備されているhandleSubmit関数にonSubmitの値を代入 */}
          <div>
            <label htmlFor="name">Q1. 名前を入力してください(匿名可)</label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({field: { value, onChange }}) => <Input value={value} onChange={onChange} />}
            ></Controller>
          </div>
          <div>
            <label htmlFor="birth">Q2. 生年月日を入力してください。(例: 19900101)</label>
            <Controller
              name="birth"
              defaultValue=""
              control={control}
              rules={{required: true, pattern: /^[0-9]{8}$/ }}
              render={({field: { value, onChange }}) => <Input value={value} onChange={onChange} />}
            ></Controller>
            {
              errors.birth && errors.birth.type === "required" ?  
              <span>このフィールドは回答必須です。</span>: null
            }
            {
              errors.birth && errors.birth.type === "pattern" ?  
              <span>整数8桁で入力してください。</span>: null
            }
          </div>
          <div>
            <span>Q3. 現在、プログラミングを学習していますか？</span>
            <input
              type="radio"
              name="isLearning"
              id="isLearning1"
              value="true"
              {...register("isLearning", { required: true })}
            />
            <label htmlFor="isLearning1">はい</label>
            <input
              type="radio"
              name="isLearning"
              id="isLearning2"
              value="false"
              {...register("isLearning", { required: true })}
            />
            <label htmlFor="isLearning2">いいえ</label>
            <input
              type="radio"
              name="isLearning"
              id="isLearning3"
              value="false"
              {...register("isLearning", { required: true })}
            />
            <label htmlFor="isLearning3">わからない</label>
            {
              errors.isLearning &&
              <span>このフィールドは回答必須です。</span>
            }
          </div>
          <div>
            <span>Q4. これまでに、プログラミングを学習したことがありますか？</span>
            <input
              type="radio"
              name="wasLearning"
              id="wasLearning1"
              value="true"
              {...register("wasLearning", { required: true })}
            />
            <label htmlFor="wasLearning1">はい</label>
            <input
              type="radio"
              name="wasLearning"
              id="wasLearning2"
              value="false"
              {...register("wasLearning", { required: true })}
            />
            <label htmlFor="wasLearning2">いいえ</label>
            <input
              type="radio"
              name="wasLearning"
              id="wasLearning3"
              value="false"
              {...register("wasLearning", { required: true })}
            />
            <label htmlFor="wasLearning3">わからない</label>
            {
              errors.wasLearning &&
              <span>このフィールドは回答必須です。</span>
            }
          </div>
          {
            watch("isLearning") === 'true' || watch("wasLearning") === 'true' ?
            <>
              <div>
                <span>Q5. 今まで学習したことのあるプログラミング言語を全て教えて下さい。</span>
                <Controller
                name="language"
                defaultValue=""
                control={control}
                render={({field: { value, onChange }}) => <Input value={value} onChange={onChange} /> } 
                ></Controller>
              </div>
            </>: null
          }
          <button type="submit">アンケートを提出する</button>
        </form>
      </Container>
    </>
  )
}

// htmlForで関連付け
// =>htmlForとidが同じ時、関連付けた状態になる
// =>関連付けるあことでラベル部分のクリックでその部分を選択できることができる
// url https://www.tagindex.com/html5/form/label.html

// radioボタン
// 同じ回答群でnameを一致させないと複数回答できるようになってしまう

// firestoreはundefinedのdataを保存することができない
// =>languageの中身の有無によって分ける必要がある(10~25行目)