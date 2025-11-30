import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import confetti from 'canvas-confetti';

const slides = [
  {
    id: 1,
    title: '🎯 Что такое коррупция?',
    content: 'Коррупция — это когда кто-то использует своё положение для получения выгоды нечестным путём.',
    examples: [
      { text: '💰 Взятки за услуги', icon: 'Banknote' },
      { text: '🎁 Подарки за особое отношение', icon: 'Gift' },
      { text: '🚫 Нарушение правил за деньги', icon: 'Ban' }
    ],
    color: 'bg-gradient-to-br from-purple-100 via-purple-200 to-pink-200',
    funFact: '💡 Знаете ли вы? Слово "коррупция" происходит от латинского "corrumpere" — разрушать, портить.'
  },
  {
    id: 2,
    title: '🏥 Примеры из жизни',
    content: 'Ситуации, с которыми можно столкнуться:',
    examples: [
      { text: '👨‍⚕️ Врач требует деньги за приём вне очереди', icon: 'Stethoscope' },
      { text: '📋 Чиновник просит подарок за быструю справку', icon: 'FileText' },
      { text: '👮 Полицейский берёт деньги вместо штрафа', icon: 'Shield' },
      { text: '🏫 Учитель ставит оценки за подарки', icon: 'School' }
    ],
    color: 'bg-gradient-to-br from-orange-100 via-orange-200 to-yellow-200',
    funFact: '🤔 Загадка: Что нужно делать, если кто-то просит деньги за то, что должно быть бесплатно?'
  },
  {
    id: 3,
    title: '⚠️ Последствия',
    content: 'Почему коррупция — это плохо для всех:',
    examples: [
      { text: '😔 Несправедливость: страдают честные люди', icon: 'Frown' },
      { text: '💸 Дороже услуги: приходится платить больше', icon: 'TrendingUp' },
      { text: '🚧 Плохое качество: работа делается хуже', icon: 'AlertTriangle' },
      { text: '🤝 Потеря доверия: люди не верят друг другу', icon: 'Users' }
    ],
    color: 'bg-gradient-to-br from-red-100 via-red-200 to-orange-200',
    funFact: '📊 Факт: В странах с низкой коррупцией люди живут счастливее и богаче!'
  },
  {
    id: 4,
    title: '💪 Как противостоять?',
    content: 'Что можете сделать вы:',
    examples: [
      { text: '🗣️ Говорите "нет" несправедливости', icon: 'MessageCircle' },
      { text: '👨‍👩‍👧 Расскажите взрослым о проблеме', icon: 'Users' },
      { text: '📞 Позвоните на горячую линию', icon: 'Phone' },
      { text: '✅ Всегда поступайте честно сами', icon: 'CheckCircle' },
      { text: '📚 Учитесь и изучайте свои права', icon: 'BookOpen' }
    ],
    color: 'bg-gradient-to-br from-green-100 via-green-200 to-emerald-200',
    funFact: '🦸 Помните: даже дети могут быть супергероями честности!'
  }
];

const quizQuestions = [
  {
    question: 'Что такое коррупция?',
    emoji: '🤔',
    options: [
      'Когда помогаешь другу',
      'Когда используешь свою должность для выгоды нечестно',
      'Когда даришь подарки'
    ],
    correct: 1,
    explanation: 'Правильно! Коррупция — это злоупотребление властью для личной выгоды.'
  },
  {
    question: 'Что НЕ является коррупцией?',
    emoji: '🌸',
    options: [
      'Подарок учителю за хорошую оценку',
      'Деньги врачу за приём без очереди',
      'Благодарность учителю цветами на праздник'
    ],
    correct: 2,
    explanation: 'Верно! Подарок на праздник — это знак уважения, а не взятка.'
  },
  {
    question: 'Что делать, если столкнулся с коррупцией?',
    emoji: '☎️',
    options: [
      'Промолчать и забыть',
      'Рассказать взрослым или позвонить на горячую линию',
      'Тоже начать брать взятки'
    ],
    correct: 1,
    explanation: 'Отлично! Важно сообщать о несправедливости взрослым.'
  },
  {
    question: 'Кто страдает от коррупции?',
    emoji: '🌍',
    options: [
      'Только бедные люди',
      'Только богатые люди',
      'Все люди в обществе'
    ],
    correct: 2,
    explanation: 'Точно! Коррупция вредит всему обществу без исключения.'
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
  const [showExplanation, setShowExplanation] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
    const timer = setTimeout(() => setAnimateCards(false), 100);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#9b87f5', '#F97316', '#10b981', '#ec4899']
    });
  };

  const triggerCelebration = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#9b87f5', '#F97316', '#10b981']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#f59e0b', '#8b5cf6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

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
      triggerConfetti();
      setTimeout(() => setShowExplanation(true), 500);
    } else {
      setTimeout(() => setShowExplanation(true), 500);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      if (score >= 3) {
        triggerCelebration();
      }
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
    setShowExplanation(false);
  };

  if (quizFinished) {
    const percentage = (score / quizQuestions.length) * 100;
    let emoji = '🎉';
    let message = 'Отлично!';
    let badge = '🏆 Мастер честности!';
    
    if (percentage < 50) {
      emoji = '📚';
      message = 'Нужно ещё поучиться!';
      badge = '📖 Начинающий исследователь';
    } else if (percentage < 75) {
      emoji = '👍';
      message = 'Хорошо!';
      badge = '⭐ Знаток правды';
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-200 via-orange-100 to-green-200 animate-fade-in">
        <Card className="max-w-2xl w-full shadow-2xl border-4 border-white">
          <CardContent className="p-12 text-center">
            <div className="text-9xl mb-6 animate-bounce">{emoji}</div>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {message}
            </h2>
            <div className="text-3xl mb-6 font-semibold text-purple-700">
              {badge}
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
              <p className="text-3xl font-bold mb-2">
                Ваш результат
              </p>
              <p className="text-5xl font-bold text-purple-600">
                {score} из {quizQuestions.length}
              </p>
            </div>
            <Progress value={percentage} className="mb-8 h-6" />
            <div className="space-y-4">
              <Button 
                size="lg" 
                onClick={restartPresentation}
                className="text-2xl px-10 py-8 w-full hover:scale-105 transition-transform"
              >
                <Icon name="RotateCcw" className="mr-3" size={28} />
                Начать заново
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showQuiz) {
    const question = quizQuestions[currentQuestion];
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 animate-fade-in">
        <Card className="max-w-4xl w-full shadow-2xl border-4 border-white">
          <CardContent className="p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold flex items-center gap-3">
                <span className="text-5xl">🎮</span> Викторина
              </h2>
              <span className="text-2xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg">
                {currentQuestion + 1} / {quizQuestions.length}
              </span>
            </div>
            
            <Progress 
              value={((currentQuestion + 1) / quizQuestions.length) * 100} 
              className="mb-8 h-4"
            />
            
            <div className="text-7xl mb-6 text-center animate-bounce">
              {question.emoji}
            </div>
            
            <h3 className="text-3xl font-bold mb-10 text-center">{question.question}</h3>
            
            <div className="space-y-5 mb-8">
              {question.options.map((option, index) => {
                let buttonClass = 'text-left h-auto py-6 px-8 text-xl font-semibold transition-all duration-300';
                
                if (answered) {
                  if (index === question.correct) {
                    buttonClass += ' bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-600 text-white scale-105 shadow-2xl';
                  } else if (index === selectedAnswer) {
                    buttonClass += ' bg-gradient-to-r from-red-500 to-red-600 hover:from-red-500 hover:to-red-600 text-white';
                  }
                } else {
                  buttonClass += ' hover:scale-105 hover:shadow-xl';
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
                    <span className="mr-4 text-3xl bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </Button>
                );
              })}
            </div>
            
            {showExplanation && (
              <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-purple-300 mb-6 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{selectedAnswer === question.correct ? '✅' : '💡'}</span>
                    <p className="text-xl font-medium">{question.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {answered && (
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={nextQuestion}
                  className="text-2xl px-10 py-8 hover:scale-105 transition-transform"
                >
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>
                      Следующий вопрос
                      <Icon name="ArrowRight" className="ml-3" size={28} />
                    </>
                  ) : (
                    <>
                      Показать результат
                      <Icon name="Trophy" className="ml-3" size={28} />
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
      <div className="max-w-6xl w-full">
        <Card className={`shadow-2xl border-4 border-white ${slide.color} transition-all duration-500 animate-fade-in`}>
          <CardContent className="p-12">
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xl font-bold bg-white/80 px-6 py-3 rounded-full shadow-lg">
                Слайд {currentSlide + 1} из {slides.length}
              </span>
              <Progress 
                value={((currentSlide + 1) / slides.length) * 100} 
                className="w-64 h-4"
              />
            </div>
            
            <h1 className="text-6xl font-bold mb-6 animate-fade-in">{slide.title}</h1>
            
            <p className="text-3xl mb-10 font-semibold leading-relaxed">{slide.content}</p>
            
            <div className="grid gap-5 mb-10">
              {slide.examples.map((example, index) => (
                <Card 
                  key={index} 
                  className={`bg-white/95 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white ${
                    animateCards ? 'animate-fade-in' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8 flex items-center gap-4">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-full p-4">
                      <Icon name={example.icon} size={32} className="text-white" />
                    </div>
                    <p className="text-2xl font-semibold flex-1">{example.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-orange-300 mb-10">
              <CardContent className="p-6">
                <p className="text-xl font-medium">{slide.funFact}</p>
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center gap-4 flex-wrap">
              <Button
                size="lg"
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="text-2xl px-10 py-8 bg-white/90 hover:scale-105 transition-transform font-bold"
              >
                <Icon name="ArrowLeft" className="mr-3" size={28} />
                Назад
              </Button>
              
              <Button
                size="lg"
                onClick={nextSlide}
                className="text-2xl px-10 py-8 hover:scale-105 transition-transform font-bold shadow-xl"
              >
                {currentSlide === slides.length - 1 ? (
                  <>
                    Начать викторину 🎮
                    <Icon name="Play" className="ml-3" size={28} />
                  </>
                ) : (
                  <>
                    Далее
                    <Icon name="ArrowRight" className="ml-3" size={28} />
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
