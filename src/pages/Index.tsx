import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const slides = [
  {
    id: 1,
    title: '🎯 Что такое коррупция?',
    content: 'Коррупция — это когда кто-то использует своё положение для получения выгоды нечестным путём.',
    examples: [
      '💰 Взятки за услуги',
      '🎁 Подарки за особое отношение',
      '🚫 Нарушение правил за деньги'
    ],
    color: 'bg-gradient-to-br from-purple-100 to-purple-200'
  },
  {
    id: 2,
    title: '🏥 Примеры из жизни',
    content: 'Ситуации, с которыми можно столкнуться:',
    examples: [
      '👨‍⚕️ Врач требует деньги за приём вне очереди',
      '📋 Чиновник просит подарок за быструю справку',
      '👮 Полицейский берёт деньги вместо штрафа',
      '🏫 Учитель ставит оценки за подарки'
    ],
    color: 'bg-gradient-to-br from-orange-100 to-orange-200'
  },
  {
    id: 3,
    title: '⚠️ Последствия',
    content: 'Почему коррупция — это плохо для всех:',
    examples: [
      '😔 Несправедливость: страдают честные люди',
      '💸 Дороже услуги: приходится платить больше',
      '🚧 Плохое качество: работа делается хуже',
      '🤝 Потеря доверия: люди не верят друг другу'
    ],
    color: 'bg-gradient-to-br from-red-100 to-red-200'
  },
  {
    id: 4,
    title: '💪 Как противостоять?',
    content: 'Что можете сделать вы:',
    examples: [
      '🗣️ Говорите "нет" несправедливости',
      '👨‍👩‍👧 Расскажите взрослым о проблеме',
      '📞 Позвоните на горячую линию',
      '✅ Всегда поступайте честно сами',
      '📚 Учитесь и изучайте свои права'
    ],
    color: 'bg-gradient-to-br from-green-100 to-green-200'
  }
];

const quizQuestions = [
  {
    question: 'Что такое коррупция?',
    options: [
      'Когда помогаешь другу',
      'Когда используешь свою должность для выгоды нечестно',
      'Когда даришь подарки'
    ],
    correct: 1
  },
  {
    question: 'Что НЕ является коррупцией?',
    options: [
      'Подарок учителю за хорошую оценку',
      'Деньги врачу за приём без очереди',
      'Благодарность учителю цветами на праздник'
    ],
    correct: 2
  },
  {
    question: 'Что делать, если столкнулся с коррупцией?',
    options: [
      'Промолчать и забыть',
      'Рассказать взрослым или позвонить на горячую линию',
      'Тоже начать брать взятки'
    ],
    correct: 1
  },
  {
    question: 'Кто страдает от коррупции?',
    options: [
      'Только бедные люди',
      'Только богатые люди',
      'Все люди в обществе'
    ],
    correct: 2
  }
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const restartPresentation = () => {
    setCurrentSlide(0);
    setShowQuiz(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const percentage = (score / quizQuestions.length) * 100;
    let emoji = '🎉';
    let message = 'Отлично!';
    
    if (percentage < 50) {
      emoji = '📚';
      message = 'Нужно ещё поучиться!';
    } else if (percentage < 75) {
      emoji = '👍';
      message = 'Хорошо!';
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-200 via-orange-100 to-green-200">
        <Card className="max-w-2xl w-full shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="text-8xl mb-4">{emoji}</div>
            <h2 className="text-4xl font-bold mb-4">{message}</h2>
            <p className="text-2xl mb-6">
              Ваш результат: {score} из {quizQuestions.length}
            </p>
            <Progress value={percentage} className="mb-8 h-4" />
            <Button 
              size="lg" 
              onClick={restartPresentation}
              className="text-xl px-8 py-6"
            >
              <Icon name="RotateCcw" className="mr-2" size={24} />
              Начать заново
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showQuiz) {
    const question = quizQuestions[currentQuestion];
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
        <Card className="max-w-3xl w-full shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">🎮 Викторина</h2>
              <span className="text-xl font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-full">
                {currentQuestion + 1} / {quizQuestions.length}
              </span>
            </div>
            
            <Progress 
              value={((currentQuestion + 1) / quizQuestions.length) * 100} 
              className="mb-8 h-3"
            />
            
            <h3 className="text-2xl font-semibold mb-8">{question.question}</h3>
            
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => {
                let buttonClass = 'text-left h-auto py-4 px-6 text-lg';
                
                if (answered) {
                  if (index === question.correct) {
                    buttonClass += ' bg-green-500 hover:bg-green-500 text-white';
                  } else if (index === selectedAnswer) {
                    buttonClass += ' bg-red-500 hover:bg-red-500 text-white';
                  }
                }
                
                return (
                  <Button
                    key={index}
                    variant={answered ? 'default' : 'outline'}
                    className={buttonClass}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    size="lg"
                  >
                    <span className="mr-3 text-2xl">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </Button>
                );
              })}
            </div>
            
            {answered && (
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={nextQuestion}
                  className="text-xl px-8 py-6"
                >
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>
                      Следующий вопрос
                      <Icon name="ArrowRight" className="ml-2" size={24} />
                    </>
                  ) : (
                    <>
                      Показать результат
                      <Icon name="Trophy" className="ml-2" size={24} />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const slide = slides[currentSlide];
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-200 via-orange-100 to-green-200">
      <div className="max-w-5xl w-full">
        <Card className={`shadow-2xl ${slide.color} border-0 transition-all duration-300 animate-fade-in`}>
          <CardContent className="p-12">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-semibold bg-white/70 px-4 py-2 rounded-full">
                Слайд {currentSlide + 1} из {slides.length}
              </span>
              <Progress 
                value={((currentSlide + 1) / slides.length) * 100} 
                className="w-48 h-3"
              />
            </div>
            
            <h1 className="text-5xl font-bold mb-8">{slide.title}</h1>
            
            <p className="text-2xl mb-8 font-medium">{slide.content}</p>
            
            <div className="grid gap-4 mb-12">
              {slide.examples.map((example, index) => (
                <Card 
                  key={index} 
                  className="bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <CardContent className="p-6">
                    <p className="text-xl font-medium">{example}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Button
                size="lg"
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="text-xl px-8 py-6 bg-white/80"
              >
                <Icon name="ArrowLeft" className="mr-2" size={24} />
                Назад
              </Button>
              
              <Button
                size="lg"
                onClick={nextSlide}
                className="text-xl px-8 py-6"
              >
                {currentSlide === slides.length - 1 ? (
                  <>
                    Начать викторину
                    <Icon name="Play" className="ml-2" size={24} />
                  </>
                ) : (
                  <>
                    Далее
                    <Icon name="ArrowRight" className="ml-2" size={24} />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
